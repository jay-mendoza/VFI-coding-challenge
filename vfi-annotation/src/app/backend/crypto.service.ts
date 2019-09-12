import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({ providedIn: 'root' })

/**
 * Crypto Service class used for Cryptography functions.
 */
export class CryptoService {

    /**
     * Initializes a new instance of CryptoService class.
     */
    public constructor() { }

    /**
     * Encrypts a value with a given key.
     * @param {string} value String value to encrypt.
     * @param {string} key String key to use in the encryption.
     * @returns {string} The encypted value of the input string.
     */
    public encrypt(value: string, key: string): string {
        return CryptoJS.AES.encrypt(value, key);
    }

    /**
     * Decrypts a value with a given key.
     * @param {string} value String value to decrypt.
     * @param {string} key String key to use in the decryption.
     * @returns {string} The decypted value of the input string.
     */
    public decrypt(value: string, key: string): string {
        return CryptoJS.AES.decrypt(value, key).toString(CryptoJS.enc.Utf8);
    }

    /**
     * Hashes a value of a string.
     * @param {string} value String value to hash.
     * @returns {string} The hashed value of input string.
     */
    public hash(value: string): string {
        return CryptoJS.SHA3(value, { outputLength: 512 }).toString();
    }
}

/* Developer Note: Hashing the password, just for this exercise
 * where we use localStorage for storing users. */