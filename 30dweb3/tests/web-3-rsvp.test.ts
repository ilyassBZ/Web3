import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Bytes, Address, BigInt } from "@graphprotocol/graph-ts"
import { DepositsPaidOut } from "../generated/schema"
import { DepositsPaidOut as DepositsPaidOutEvent } from "../generated/Web3RSVP/Web3RSVP"
import { handleDepositsPaidOut } from "../src/web-3-rsvp"
import { createDepositsPaidOutEvent } from "./web-3-rsvp-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let eventID = Bytes.fromI32(1234567890)
    let newDepositsPaidOutEvent = createDepositsPaidOutEvent(eventID)
    handleDepositsPaidOut(newDepositsPaidOutEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("DepositsPaidOut created and stored", () => {
    assert.entityCount("DepositsPaidOut", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "DepositsPaidOut",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "eventID",
      "1234567890"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
