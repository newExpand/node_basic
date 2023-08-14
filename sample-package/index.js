console.log("require로 부르면 실행됩니다.");

module.exports = {
    add: (a, b) => a + b,
    sub: (a, b) => a - b,
    multi: (a, b) => a * b,
    div: (a, b) => a / b,
};

/* 
npm ERR! code EISDIR npm ERR! syscall symlink 에러 해결 방법
npm pack 으로 압축을 하고 sample-test폴더에서 npm i ../sample-package/sample-package-1.0.0.tgz 를 하니까 설치됨
*/
