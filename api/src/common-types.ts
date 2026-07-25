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
 * Journal DApp common types and abstractions.
 *
 * @module
 */

import { type MidnightProviders } from '@midnight-ntwrk/midnight-js-types';
import { type FoundContract } from '@midnight-ntwrk/midnight-js-contracts';
import type { State, JournalPrivateState, Contract, Witnesses } from '../../contract/src/index';

export const journalPrivateStateKey = 'journalPrivateState';
export const bboardPrivateStateKey = journalPrivateStateKey;
export type PrivateStateId = typeof journalPrivateStateKey;

/**
 * The private states consumed throughout the Journal application.
 *
 * @public
 */
export type PrivateStates = {
  readonly journalPrivateState: JournalPrivateState;
  readonly bboardPrivateState: JournalPrivateState;
};

/**
 * Represents a journal contract and its private state.
 *
 * @public
 */
export type JournalContract = Contract<JournalPrivateState, Witnesses<JournalPrivateState>>;
export type BBoardContract = JournalContract;

/**
 * The keys of the circuits exported from {@link JournalContract}.
 *
 * @public
 */
export type JournalCircuitKeys = Exclude<keyof JournalContract['impureCircuits'], number | symbol>;
export type BBoardCircuitKeys = JournalCircuitKeys;

/**
 * The providers required by {@link JournalContract}.
 *
 * @public
 */
export type JournalProviders = MidnightProviders<JournalCircuitKeys, PrivateStateId, JournalPrivateState>;
export type BBoardProviders = JournalProviders;

/**
 * A {@link JournalContract} that has been deployed to the network.
 *
 * @public
 */
export type DeployedJournalContract = FoundContract<JournalContract>;
export type DeployedBBoardContract = DeployedJournalContract;

/**
 * A type that represents the derived combination of public (or ledger) and private journal state.
 */
export type JournalDerivedState = {
  readonly state: State;
  readonly sequence: bigint;
  readonly message: string | undefined;
  readonly isOwner: boolean;
};
export type BBoardDerivedState = JournalDerivedState;

