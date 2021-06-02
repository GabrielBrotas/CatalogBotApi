import { Request, Response, NextFunction } from 'express';

const Colors = {
  Reset: '\x1b[0m',
  Bright: '\x1b[1m',
  Dim: '\x1b[2m',
  Underscore: '\x1b[4m',
  Blink: '\x1b[5m',
  Reverse: '\x1b[7m',
  Hidden: '\x1b[8m',

  FgBlack: '\x1b[30m',
  FgRed: '\x1b[31m',
  FgGreen: '\x1b[32m',
  FgYellow: '\x1b[33m',
  FgBlue: '\x1b[34m',
  FgMagenta: '\x1b[35m',
  FgCyan: '\x1b[36m',
  FgWhite: '\x1b[37m',

  BgBlack: '\x1b[40m',
  BgRed: '\x1b[41m',
  BgGreen: '\x1b[42m',
  BgYellow: '\x1b[43m',
  BgBlue: '\x1b[44m',
  BgMagenta: '\x1b[45m',
  BgCyan: '\x1b[46m',
  BgWhite: '\x1b[47m',
};

export interface LogOptions {
  context?: string;
}

export class Logger {
  context: string = '';

  constructor(context: string) {
    this.context = context;
  }

  getTimestamp(): string {
    const now = new Date();
    return `${now.toLocaleDateString()} - ${now.toLocaleTimeString()}`;
  }

  getPrefix({ context = this.context }: LogOptions = {}): string {
    let prefix = '';

    if (context) {
      prefix += `[${context}]`;
    }

    return `${Colors.FgBlue}${prefix}\x1b[0m`;
  }

  error(message: string, data?: any, options?: LogOptions): void {
    try {
      console.error(
        `${this.getTimestamp()} ${this.getPrefix(options)} ==> ${
          Colors.FgRed
        }${message}\x1b[0m`,
        data,
      );
    } catch (err) {
      console.error('Erro ao enviar error para serviço', err);
    }
  }

  log(message: string, options?: LogOptions): void {
    try {
      console.log(
        `${this.getTimestamp()} ${this.getPrefix(options)} ==> ${
          Colors.FgWhite
        }${message}\x1b[0m`,
      );
    } catch (err) {
      console.error('Erro ao enviar log para serviço', err);
    }
  }

  warn(message: string, options?: LogOptions): void {
    try {
      console.warn(
        `${this.getTimestamp()} ${this.getPrefix(options)} ==> ${
          Colors.FgWhite
        }${message}\x1b[0m`,
      );
    } catch (err) {
      console.error('Erro ao enviar warn para serviço', err);
    }
  }
}

