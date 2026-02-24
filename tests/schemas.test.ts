import { describe, it, expect } from 'vitest'
import { ParsleyMessageSchema } from '../src/schemas.js'
import {
    MsgPrio,
    MsgType,
    BoardTypeId,
    BoardInstId,
} from '../src/messageTypes.js'

describe('ParsleyMessageSchema', () => {
    it('should validate a well-formed message with data', () => {
        const result = ParsleyMessageSchema.safeParse({
            msgPrio: MsgPrio.HIGHEST,
            msgType: MsgType.ACTUATOR_CMD,
            boardTypeId: BoardTypeId.INJECTOR,
            boardInstId: BoardInstId.ROCKET,
            data: { actuatorId: 0x00, actuatorState: 0x00 },
        })
        expect(result.success).toBe(true)
    })

    it('should validate a message with null data', () => {
        const result = ParsleyMessageSchema.safeParse({
            msgPrio: MsgPrio.LOW,
            msgType: MsgType.LEDS_ON,
            boardTypeId: BoardTypeId.ANY,
            boardInstId: BoardInstId.ANY,
            data: null,
        })
        expect(result.success).toBe(true)
    })

    it('should reject a message with invalid msgPrio', () => {
        const result = ParsleyMessageSchema.safeParse({
            msgPrio: 99,
            msgType: MsgType.UNDEFINED,
            boardTypeId: BoardTypeId.ANY,
            boardInstId: BoardInstId.ANY,
            data: null,
        })
        expect(result.success).toBe(false)
    })

    it('should reject a message with invalid msgType', () => {
        const result = ParsleyMessageSchema.safeParse({
            msgPrio: MsgPrio.HIGHEST,
            msgType: 0xff,
            boardTypeId: BoardTypeId.ANY,
            boardInstId: BoardInstId.ANY,
            data: null,
        })
        expect(result.success).toBe(false)
    })

    it('should reject a message missing required fields', () => {
        const result = ParsleyMessageSchema.safeParse({
            msgPrio: MsgPrio.HIGHEST,
        })
        expect(result.success).toBe(false)
    })

    it('should accept a message with empty data record', () => {
        const result = ParsleyMessageSchema.safeParse({
            msgPrio: MsgPrio.MEDIUM,
            msgType: MsgType.DEBUG_RAW,
            boardTypeId: BoardTypeId.LOGGER,
            boardInstId: BoardInstId.GROUND,
            data: {},
        })
        expect(result.success).toBe(true)
    })
})
