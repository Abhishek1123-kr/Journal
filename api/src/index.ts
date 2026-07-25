// This file is part of midnightntwrk/example-bboard.
// Copyright (C) Midnight Foundation
// SPDX-License-Identifier: Apache-2.0
// Licensed under the Apache License, Version 2.0 (the "License");
// You may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Provides types and utilities for working with Journal contracts.
 *
 * @packageDocumentation
 */

import * as JournalManaged from '../../contract/src/managed/journal/contract/index.js';

import { type ContractAddress, convertFieldToBytes } from '@midnight-ntwrk/midnight-js-protocol/compact-runtime';
import { type Logger } from 'pino';
import {
  type JournalDerivedState,
  type JournalContract,
  type JournalProviders,
  type DeployedJournalContract,
  journalPrivateStateKey,
} from './common-types.js';
import { CompiledJournalContractContract } from '../../contract/src/index.js';
import * as utils from './utils/index.js';
import { deployContract, findDeployedContract } from '@midnight-ntwrk/midnight-js-contracts';
import { combineLatest, map, tap, from, type Observable } from 'rxjs';
import { toHex } from '@midnight-ntwrk/midnight-js-utils';
import { JournalPrivateState, createJournalPrivateState } from '../../contract/src/witnesses.js';

export const CONTRACT_ADDRESS_PLACEHOLDER = "<YOUR_DEPLOYED_CONTRACT_ADDRESS>";

/**
 * An API for a deployed Journal contract.
 */
export interface DeployedJournalAPI {
  readonly deployedContractAddress: ContractAddress;
  readonly state$: Observable<JournalDerivedState>;

  post: (message: string) => Promise<void>;
  takeDown: () => Promise<void>;
}
export type DeployedBBoardAPI = DeployedJournalAPI;

/**
 * Provides an implementation of {@link DeployedJournalAPI} by adapting a deployed journal contract.
 */
export class JournalAPI implements DeployedJournalAPI {
  private constructor(
    public readonly deployedContract: DeployedJournalContract,
    providers: JournalProviders,
    private readonly logger?: Logger,
  ) {
    this.deployedContractAddress = deployedContract.deployTxData.public.contractAddress;
    providers.privateStateProvider.setContractAddress(this.deployedContractAddress);
    this.state$ = combineLatest(
      [
        providers.publicDataProvider.contractStateObservable(this.deployedContractAddress, { type: 'latest' }).pipe(
          map((contractState) => JournalManaged.ledger(contractState.data)),
          tap((ledgerState) =>
            logger?.trace({
              ledgerStateChanged: {
                ledgerState: {
                  ...ledgerState,
                  state: ledgerState.state === JournalManaged.State.OCCUPIED ? 'occupied' : 'vacant',
                  owner: toHex(ledgerState.owner),
                },
              },
            }),
          ),
        ),
        from(providers.privateStateProvider.get(journalPrivateStateKey) as Promise<JournalPrivateState>),
      ],
      (ledgerState, privateState) => {
        const hashedSecretKey = JournalManaged.pureCircuits.publicKey(
          privateState.secretKey,
          convertFieldToBytes(32, ledgerState.sequence, 'api/src/index.ts'),
        );

        return {
          state: ledgerState.state,
          message: ledgerState.message.value,
          sequence: ledgerState.sequence,
          isOwner: toHex(ledgerState.owner) === toHex(hashedSecretKey),
        };
      },
    );
  }

  readonly deployedContractAddress: ContractAddress;
  readonly state$: Observable<JournalDerivedState>;

  async post(message: string): Promise<void> {
    this.logger?.info(`postingJournalEntry: ${message}`);
    const txData = await this.deployedContract.callTx.post(message);
    this.logger?.trace({
      transactionAdded: {
        circuit: 'post',
        txHash: txData.public.txHash,
        blockHeight: txData.public.blockHeight,
      },
    });
  }

  async takeDown(): Promise<void> {
    this.logger?.info('takingDownJournalEntry');
    const txData = await this.deployedContract.callTx.takeDown();
    this.logger?.trace({
      transactionAdded: {
        circuit: 'takeDown',
        txHash: txData.public.txHash,
        blockHeight: txData.public.blockHeight,
      },
    });
  }

  static async deploy(providers: JournalProviders, logger?: Logger): Promise<JournalAPI> {
    logger?.info('deployJournalContract');

    const deployedJournalContract = await deployContract(providers, {
      compiledContract: CompiledJournalContractContract,
      privateStateId: journalPrivateStateKey,
      initialPrivateState: createJournalPrivateState(utils.randomBytes(32)),
    });

    logger?.trace({
      contractDeployed: {
        finalizedDeployTxData: deployedJournalContract.deployTxData.public,
      },
    });

    return new JournalAPI(deployedJournalContract, providers, logger);
  }

  static async join(providers: JournalProviders, contractAddress: ContractAddress, logger?: Logger): Promise<JournalAPI> {
    logger?.info({
      joinContract: {
        contractAddress,
      },
    });

    const deployedJournalContract = await findDeployedContract<JournalContract>(providers, {
      contractAddress,
      compiledContract: CompiledJournalContractContract,
      privateStateId: journalPrivateStateKey,
      initialPrivateState: await JournalAPI.getPrivateState(providers, contractAddress),
    });

    logger?.trace({
      contractJoined: {
        finalizedDeployTxData: deployedJournalContract.deployTxData.public,
      },
    });

    return new JournalAPI(deployedJournalContract, providers, logger);
  }

  private static async getPrivateState(
    providers: JournalProviders,
    contractAddress: ContractAddress,
  ): Promise<JournalPrivateState> {
    providers.privateStateProvider.setContractAddress(contractAddress);
    const existingPrivateState = await providers.privateStateProvider.get(journalPrivateStateKey);
    return existingPrivateState ?? createJournalPrivateState(utils.randomBytes(32));
  }
}

export const BBoardAPI = JournalAPI;
export type BBoardAPI = JournalAPI;

export * as utils from './utils/index.js';
export * from './common-types.js';

