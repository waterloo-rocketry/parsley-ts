export class BitString{
    data: bigint;
    length: number;


    public constructor (data: Uint8Array = new Uint8Array(), data_bit_length: number = 0) {
        this.length = data_bit_length || (data.length * 8);
        this.data = BigInt(0);
        
        for (const byte of data) {
            this.data = (this.data << 8n) | BigInt(byte)
        }
    }

    public pop(field_length: number, variable_length: boolean = false): bigint { 
        /*
        Returns the next field_length most significant bits of data as a bigint.

        The data returned will be LSB-aligned, so for example, asking for 12 bits will return:
        0000BBBB BBBBBBBB
        where B represents a data bit.
        */

        // In the Python version, pop() returns bytes but then every field decoder 
        // lowkey converts it back into bytes xd, so just return bigint directly
       

        if (field_length > this.length) {
            if (variable_length) {
                field_length = this.length;
            } else {
                throw new RangeError(`Cannot pop ${field_length} bits from a BitString of length ${this.length}, try setting variable_length to true.`);
            }
        }

        this.length -= field_length;
        const result: bigint = this.data >> BigInt(this.length); // extract the field_length most significant bits
        this.data = this.data & ((BigInt(1) << BigInt(this.length)) - BigInt(1)); // and then mask them out
        return result;
    }

    public push(value: bigint | number, field_length: number): void {
        /*
        Appends the next field_length least significant bits of data from value (to the back).

        So for example, appending 6 bits from:
        10110000
        will append only 110000
        */
        value = BigInt(value);
        if (field_length < 0) {
            throw new Error(`Field length must be non-negative, got ${field_length}.`);
        }

        this.length += field_length;
        value = value & ((BigInt(1) << BigInt(field_length)) - BigInt(1)); // extract the field_length least significant bits
        this.data = value | (this.data << BigInt(field_length)); // shift the new bits to the left and then add them to the existing data
    }

    public push_front(value: bigint | number, field_length: number): void {
        /*
        Prepends the next field_length least significant bits of data from value (to the front).
        */

        value = BigInt(value);
        if (field_length < 0) {
            throw new Error(`Field length must be non-negative, got ${field_length}.`);
        }

        this.data = (value << BigInt(this.length)) | this.data; // shift the new bits to the left and then add them to the existing data
        this.length += field_length;
    }

}
