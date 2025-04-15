import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class EncryptionService {
  private ENCRYPTION_KEY: Buffer;

  constructor(private configService: ConfigService) {
    this.ENCRYPTION_KEY = Buffer.from(
      this.configService.get<string>('ENCRYPTION_KEY')!,
      'hex',
    );

    if (this.ENCRYPTION_KEY.length !== 32) {
      throw new Error('Invalid ENCRYPTION_KEY length. Must be 32 bytes.');
    }
  }

  encrypt(text: string): string {
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv(
      'aes-256-gcm',
      this.ENCRYPTION_KEY,
      iv,
    );

    let encrypted = cipher.update(text, 'utf8', 'base64');
    encrypted += cipher.final('base64');

    const authTag = cipher.getAuthTag();

    return [iv.toString('base64'), encrypted, authTag.toString('base64')].join(
      ':',
    );
  }

  decrypt(encryptedData: string): string {
    try {
      const [ivB64, encrypted, authTagB64] = encryptedData.split(':');
      if (!ivB64 || !encrypted || !authTagB64) {
        throw new Error('Invalid encrypted data format');
      }

      const iv = Buffer.from(ivB64, 'base64');
      const authTag = Buffer.from(authTagB64, 'base64');

      const decipher = crypto.createDecipheriv(
        'aes-256-gcm',
        this.ENCRYPTION_KEY,
        iv,
      );
      decipher.setAuthTag(authTag);

      let decrypted = decipher.update(encrypted, 'base64', 'utf8');
      decrypted += decipher.final('utf8');

      return decrypted;
    } catch (err) {
      throw new Error('Failed to decrypt token: ' + err.message);
    }
  }
}
