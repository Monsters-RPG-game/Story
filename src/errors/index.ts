// eslint-disable-next-line max-classes-per-file
export class FullError extends Error {
  code = '000';
  status = 500;
}

export class MissingProcessPlatformError extends FullError {
  constructor() {
    super('MissingProcessPlatformError');
    this.message = 'process.platform is missing';
    this.name = 'MissingProcessPlatformError';
    this.code = '001';
    this.status = 500;
  }
}

export class MissingArgError extends FullError {
  constructor(param: string) {
    super('MissingArgError');
    this.message = `Missing param: ${param}`;
    this.name = 'MissingArgError';
    this.code = '002';
    this.status = 400;
  }
}

export class IncorrectArgError extends FullError {
  constructor(err: string) {
    super('IncorrectArgError');
    this.message = err;
    this.name = 'IncorrectArgError';
    this.code = '003';
    this.status = 400;
  }
}

export class IncorrectArgTypeError extends FullError {
  constructor(err: string) {
    super('IncorrectArgTypeError');
    this.message = err;
    this.name = 'IncorrectArgTypeError';
    this.code = '004';
    this.status = 400;
  }
}

export class IncorrectCredentialsError extends FullError {
  constructor(message?: string) {
    super('IncorrectCredentialsError');
    this.message = message ?? 'Incorrect credentials';
    this.name = 'IncorrectCredentialsError';
    this.code = '005';
    this.status = 400;
  }
}

export class IncorrectArgLengthError extends FullError {
  constructor(target: string, min: number | undefined, max: number) {
    super('IncorrectArgLengthError');
    this.message =
      min === undefined
        ? `${target} should be less than ${max} characters`
        : min !== max
          ? `${target} should be more than ${min} and less than ${max} characters`
          : `${target} should be ${min} characters`;
    this.name = 'IncorrectArgLengthError';
    this.code = '006';
    this.status = 400;
  }
}

export class IncorrectTargetError extends FullError {
  constructor() {
    super('IncorrectTargetError');
    this.message = 'Incorrect data target';
    this.name = 'IncorrectTargetError';
    this.code = '007';
    this.status = 400;
  }
}

export class NotConnectedError extends FullError {
  constructor() {
    super('NotConnectedError');
    this.message = 'Rabbit is not connected';
    this.name = 'NotConnectedError';
    this.code = '008';
    this.status = 500;
  }
}

export class UserDoesNotExist extends FullError {
  constructor() {
    super('UserDoesNotExist');
    this.message = 'Selected user does not exist';
    this.name = 'UserDoesNotExist';
    this.code = '009';
    this.status = 400;
  }
}

export class NoPermission extends FullError {
  constructor() {
    super('NoPermission');
    this.message = 'You have no permission to make that action';
    this.name = 'NoPermission';
    this.code = '010';
    this.status = 400;
  }
}

export class IncorrectArgAmountError extends FullError {
  constructor(target: string, min: number | undefined, max: number) {
    super('IncorrectArgAmountError');
    this.message =
      min === undefined
        ? `${target} should be less than ${max}`
        : min !== max
          ? `${target} should be more than ${min} and less than ${max}`
          : `${target} should be ${min}`;
    this.name = 'IncorrectArgAmountError';
    this.code = '011';
    this.status = 400;
  }
}

export class ElementTooShortError extends FullError {
  constructor(target: string, min: number) {
    super('ElementTooShortError');
    this.message = `Element ${target} is too short. Minimum length is ${min}`;
    this.name = 'ElementTooShortError';
    this.code = '012';
    this.status = 400;
  }
}

export class ElementTooLongError extends FullError {
  constructor(target: string, min: number) {
    super('ElementTooShortLongError');
    this.message = `Element ${target} is too long. Maximum length is ${min}`;
    this.name = 'ElementTooShortLongError';
    this.code = '013';
    this.status = 400;
  }
}

export class FileDoesNotExist extends FullError {
  constructor() {
    super('FileDoesNotExist');
    this.message = 'Provided file does not exist';
    this.name = 'FileDoesNotExist';
    this.code = '014';
    this.status = 404;
  }
}
export class FileIdDoesntMatchEntity extends FullError {
  constructor() {
    super('FileIdDoesntMatchEntity');
    this.message = "Id provided as a key in index file doesn't match id from npc file";
    this.name = 'FileIdDoesntMatchEntity';
    this.code = '015';
    this.status = 400;
  }
}
export class FileVersionNotExist extends FullError {
  constructor() {
    super('FileVersionNotExist');
    this.message = 'File version not found';
    this.name = 'FileVersionNotExist';
    this.code = '016';
    this.status = 404;
  }
}
export class EpisodeNumberNotExist extends FullError {
  constructor() {
    super('EpisodeNumberNotExist');
    this.message = 'Episode number not found';
    this.name = 'EpisodeNumberNotExist';
    this.code = '017';
    this.status = 404;
  }
}
export class EpisodeFileNotExist extends FullError {
  constructor() {
    super('EpisodeFileNotExist');
    this.message = 'Episode file not found';
    this.name = 'EpisodeFileNotExist';
    this.code = '018';
    this.status = 404;
  }
}
export class VersionIncorrect extends FullError {
  constructor() {
    super('VersionIncorrect');
    this.message = 'Passed version can not be smaller than actual version';
    this.name = 'VersionIncorrect';
    this.code = '019';
    this.status = 400;
  }
}
export class NarratorEpisodePresent extends FullError {
  constructor() {
    super('NarratorEpisodePresent');
    this.message = 'Passed narrator episode is already present';
    this.name = 'NarratorEpisodePresent';
    this.code = '020';
    this.status = 400;
  }
}
export class StageNumberPresent extends FullError {
  constructor() {
    super('StageNumberPresent');
    this.message = 'Stage number passed is already present in scope of this stage';
    this.name = 'StageNumberPresent';
    this.code = '021';
    this.status = 400;
  }
}
export class ChapterNumberPresent extends FullError {
  constructor() {
    super('ChapterNumberPresent');
    this.message = 'Chapter number passed is already present in scope of this chapter';
    this.name = 'ChapterNumberPresent';
    this.code = '022';
    this.status = 400;
  }
}
export class EpisodeNumberIncorrect extends FullError {
  constructor() {
    super('EpisodeNumberIncorrect');
    this.message = 'Episode number in main file and in narrator file are different';
    this.name = 'EpisodeNumberIncorrect';
    this.code = '023';
    this.status = 400;
  }
}
export class CouldNotReadFile extends FullError {
  constructor() {
    super('CouldNotReadFile');
    this.message = 'Could not read file';
    this.name = 'CouldNotReadFile';
    this.code = '024';
    this.status = 400;
  }
}
