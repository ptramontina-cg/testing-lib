# Creative Validator

This library is used to validate media files that will be uploaded to Creative Gallery.
It can be used both in frontend and backend, but each will perform different types of validations.

Backend is the most deep type of validation as it uses ffmpeg to validate images and videos. As for VAST, it checks for information within the XML file too.

Frontend is simpler, as less information can be extracted from files.
It's important to inform that HTML videos only support `MP4`, `WEBM` and `OGG` files. Any videos that are not of those types will not be validated and library will return `true`.

## How to install

You can simply install the library from yarn or npm.

yarn add https://github.com/ExtendTV/creative-validator@version
npm install https://github.com/ExtendTV/creative-validator@version

Then, import it where you need to use.

```
import { CreativeValidator } from 'creative-validator'

const cv = new CreativeValidator();

try {
    const return = await cv.validate('video', file);
} catch (e) {
    console.log(e.errorCode);
    console.log(e.message);
}
```

If the file is valid, `true` will be returned.
If the file is not valid, then a `ValidationError` will be thrown, containing the error code and a message with all errors.

A file type should be passed as parameter for the `validate` method.

```
await cv.validate('video', file);
await cv.validate('image', file);
await cv.validate('vast', url);
```
