/*
npm scripts 명령어에서
start, stop, test, restart 명령어는 npm run을 안하고 npm start 이런식으로 바로 사용 가능하다

npm 다운로드할 때 패키지 버전을 적을 때 쓰는 기호
^ => ^1.0.0 은 1.0.0보다 크거나 같고 2.0.0보단 작은 버전 의미
~ => 현재 지정한 버전의 마지막 자리 내의 범위만 업데이트 (ex: ~0.3.1 은 0.3.1보다 크거나 같고 0.4.0보다는 작은 버전)
> => >4.0.0 은 4.0.0보다 큰 버전 중 최신 버전
< => <5.0.0 은 5.0.0보다 작은 버전 중 최신 버전

설치한 패키징 확인하는 명령어
npm ls
사용 예시 npm ls --depth=1
--depth 옵션 설치한 의존성이 의존하는 패키지 확인

pre, post 명령어를 하면 스크립트를 실행할 때 실행 전과 후에 실행할 스크립트 지정 가능
예시
"scripts": {
    'prehello': "echo 'PreHello'",
    'hello': "echo 'Hello'",
    'posthello': "echo 'PostHello'",
}
라는 명령어가 있을 때 npm run hello를 치면 실행순서
prehello -> hello -> posthello 순서로 실행된다


*/
