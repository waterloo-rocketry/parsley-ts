import { describe, it, expect } from 'vitest'
import {
    MsgPrio,
    MsgPrioSchema,
    MsgType,
    MsgTypeSchema,
    BoardTypeId,
    BoardTypeIdSchema,
    BoardInstId,
    BoardInstIdSchema,
    ActuatorId,
    ActuatorIdSchema,
    ActuatorState,
    ActuatorStateSchema,
    AltimeterId,
    AltimeterIdSchema,
    AltArmState,
    AltArmStateSchema,
    AnalogSensorId,
    AnalogSensorIdSchema,
    DemSensor2DId,
    DemSensor2DIdSchema,
    DemSensor3DId,
    DemSensor3DIdSchema,
    BoardErrorBitfieldOffset,
    BoardErrorBitfieldOffsetSchema,
} from '../src/messageTypes.js'

describe('MsgPrio', () => {
    it('should have 4 priorities', () => {
        expect(Object.keys(MsgPrio)).toHaveLength(4)
    })

    it('should validate valid priority values', () => {
        expect(MsgPrioSchema.safeParse(0).success).toBe(true)
        expect(MsgPrioSchema.safeParse(3).success).toBe(true)
    })

    it('should reject invalid priority values', () => {
        expect(MsgPrioSchema.safeParse(5).success).toBe(false)
        expect(MsgPrioSchema.safeParse(-1).success).toBe(false)
        expect(MsgPrioSchema.safeParse('HIGHEST').success).toBe(false)
    })

    it('should have correct numeric values', () => {
        expect(MsgPrio.HIGHEST).toBe(0)
        expect(MsgPrio.HIGH).toBe(1)
        expect(MsgPrio.MEDIUM).toBe(2)
        expect(MsgPrio.LOW).toBe(3)
    })
})

describe('MsgType', () => {
    it('should have 24 message types', () => {
        expect(Object.keys(MsgType)).toHaveLength(24)
    })

    it('should validate valid message type values', () => {
        expect(MsgTypeSchema.safeParse(0x00).success).toBe(true)
        expect(MsgTypeSchema.safeParse(0x01).success).toBe(true)
        expect(MsgTypeSchema.safeParse(0x17).success).toBe(true)
    })

    it('should reject invalid message type values', () => {
        expect(MsgTypeSchema.safeParse(0xff).success).toBe(false)
        expect(MsgTypeSchema.safeParse(-1).success).toBe(false)
    })

    it('should have correct hex values', () => {
        expect(MsgType.UNDEFINED).toBe(0x00)
        expect(MsgType.GENERAL_BOARD_STATUS).toBe(0x01)
        expect(MsgType.ACTUATOR_CMD).toBe(0x06)
        expect(MsgType.SENSOR_ANALOG16).toBe(0x0a)
        expect(MsgType.SENSOR_2D_ANALOG24).toBe(0x0c)
        expect(MsgType.SENSOR_3D_ANALOG16).toBe(0x0d)
        expect(MsgType.GPS_TIMESTAMP).toBe(0x0e)
        expect(MsgType.LEDS_OFF).toBe(0x17)
    })
})

describe('BoardTypeId', () => {
    it('should have 14 board types', () => {
        expect(Object.keys(BoardTypeId)).toHaveLength(14)
    })

    it('should validate valid board type values', () => {
        expect(BoardTypeIdSchema.safeParse(0x00).success).toBe(true)
        expect(BoardTypeIdSchema.safeParse(0x0d).success).toBe(true)
    })

    it('should reject invalid board type values', () => {
        expect(BoardTypeIdSchema.safeParse(0x0e).success).toBe(false)
    })

    it('should have correct hex values', () => {
        expect(BoardTypeId.ANY).toBe(0x00)
        expect(BoardTypeId.DAQ).toBe(0x0d)
    })
})

describe('BoardInstId', () => {
    it('should have 8 board instances', () => {
        expect(Object.keys(BoardInstId)).toHaveLength(8)
    })

    it('should validate valid board instance values', () => {
        expect(BoardInstIdSchema.safeParse(0x00).success).toBe(true)
        expect(BoardInstIdSchema.safeParse(0x07).success).toBe(true)
    })

    it('should reject invalid board instance values', () => {
        expect(BoardInstIdSchema.safeParse(0x08).success).toBe(false)
    })
})

describe('ActuatorId', () => {
    it('should have 23 actuator IDs', () => {
        expect(Object.keys(ActuatorId)).toHaveLength(23)
    })

    it('should validate valid actuator ID values', () => {
        expect(ActuatorIdSchema.safeParse(0x00).success).toBe(true)
        expect(ActuatorIdSchema.safeParse(0x16).success).toBe(true)
    })

    it('should reject invalid actuator ID values', () => {
        expect(ActuatorIdSchema.safeParse(0x17).success).toBe(false)
    })

    it('should have correct hex values', () => {
        expect(ActuatorId.ACTUATOR_OX_INJECTOR_VALVE).toBe(0x00)
        expect(ActuatorId.ACTUATOR_PAYLOAD_PZT_ARM).toBe(0x16)
    })
})

describe('ActuatorState', () => {
    it('should have 4 actuator states', () => {
        expect(Object.keys(ActuatorState)).toHaveLength(4)
    })

    it('should validate valid actuator state values', () => {
        expect(ActuatorStateSchema.safeParse(0x00).success).toBe(true)
        expect(ActuatorStateSchema.safeParse(0x03).success).toBe(true)
    })

    it('should reject invalid actuator state values', () => {
        expect(ActuatorStateSchema.safeParse(0x04).success).toBe(false)
    })
})

describe('AltimeterId', () => {
    it('should have 3 altimeter IDs', () => {
        expect(Object.keys(AltimeterId)).toHaveLength(3)
    })

    it('should validate valid altimeter ID values', () => {
        expect(AltimeterIdSchema.safeParse(0x00).success).toBe(true)
        expect(AltimeterIdSchema.safeParse(0x02).success).toBe(true)
    })

    it('should reject invalid altimeter ID values', () => {
        expect(AltimeterIdSchema.safeParse(0x03).success).toBe(false)
    })
})

describe('AltArmState', () => {
    it('should have 2 arm states', () => {
        expect(Object.keys(AltArmState)).toHaveLength(2)
    })

    it('should validate valid arm state values', () => {
        expect(AltArmStateSchema.safeParse(0x00).success).toBe(true)
        expect(AltArmStateSchema.safeParse(0x01).success).toBe(true)
    })

    it('should reject invalid arm state values', () => {
        expect(AltArmStateSchema.safeParse(0x02).success).toBe(false)
    })
})

describe('AnalogSensorId', () => {
    it('should have 61 sensor IDs', () => {
        expect(Object.keys(AnalogSensorId)).toHaveLength(61)
    })

    it('should validate valid sensor ID values', () => {
        expect(AnalogSensorIdSchema.safeParse(0x00).success).toBe(true)
        expect(AnalogSensorIdSchema.safeParse(0x3C).success).toBe(true)
    })

    it('should reject invalid sensor ID values', () => {
        expect(AnalogSensorIdSchema.safeParse(0x3D).success).toBe(false)
    })

    it('should have correct hex values for boundary entries', () => {
        expect(AnalogSensorId.SENSOR_5V_VOLT).toBe(0x00)
        expect(AnalogSensorId.SENSOR_PAYLOAD_SENSOR_CURR_READING).toBe(0x3C)
    })
})

describe('DemSensor2DId', () => {
    it('should have 4 DEM 2D sensor IDs', () => {
        expect(Object.keys(DemSensor2DId)).toHaveLength(4)
    })

    it('should validate valid DEM 2D sensor ID values', () => {
        expect(DemSensor2DIdSchema.safeParse(0x00).success).toBe(true)
        expect(DemSensor2DIdSchema.safeParse(0x03).success).toBe(true)
    })

    it('should reject invalid DEM 2D sensor ID values', () => {
        expect(DemSensor2DIdSchema.safeParse(0x04).success).toBe(false)
    })
})

describe('DemSensor3DId', () => {
    it('should have 13 DEM 3D sensor IDs', () => {
        expect(Object.keys(DemSensor3DId)).toHaveLength(13)
    })

    it('should validate valid DEM 3D sensor ID values', () => {
        expect(DemSensor3DIdSchema.safeParse(0x00).success).toBe(true)
        expect(DemSensor3DIdSchema.safeParse(0x0C).success).toBe(true)
    })

    it('should reject invalid DEM 3D sensor ID values', () => {
        expect(DemSensor3DIdSchema.safeParse(0x0D).success).toBe(false)
    })
})

describe('BoardErrorBitfieldOffset', () => {
    it('should have 16 error bitfield offsets', () => {
        expect(Object.keys(BoardErrorBitfieldOffset)).toHaveLength(16)
    })

    it('should validate valid offset values', () => {
        expect(BoardErrorBitfieldOffsetSchema.safeParse(0x00).success).toBe(true)
        expect(BoardErrorBitfieldOffsetSchema.safeParse(0x0F).success).toBe(true)
    })

    it('should reject invalid offset values', () => {
        expect(BoardErrorBitfieldOffsetSchema.safeParse(0x10).success).toBe(false)
    })
})
