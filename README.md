# 채팅 애플리케이션

채팅 애플리케이션에 오신 것을 환영합니다! 이 가이드는 애플리케이션을 설정하고 실행하는 데 도움을 드립니다.

## 🛠️ 설정 방법

### 사전 준비
- Docker가 설치되고 실행 중인지 확인하세요.

### 데이터베이스 설정
MongoDB 데이터베이스를 시작하려면 `docker-compose.yml` 파일이 있는 디렉토리에서 다음 명령어를 실행하세요:

```sh
docker run -d --name chat-app \
-e MONGO_INITDB_ROOT_USERNAME=mongoadmin \
-e MONGO_INITDB_ROOT_PASSWORD=test \
-p 27017:27017 \
mongo
```

### 서버 설정
서버를 시작하려면 다음 명령어를 실행하세요:

```sh
yarn start
```

### 유닛 테스트 실행
서버의 유닛 테스트를 실행하려면 다음 명령어를 사용하세요:

```sh
yarn test
```

### E2E 테스트 실행
엔드 투 엔드 테스트를 실행하려면 다음 명령어를 사용하세요:

```sh
yarn test:e2e
```

### 💬 테스트에 대한 참고 사항
시간상의 제약으로 인해 일부 테스트 코드만 추가되었습니다. 제공된 테스트는 `controller`와 `service` 유닛 테스트 및 일부 엔드 투 엔드 테스트를 포함합니다. 다른 리소스에 대해서도 유사하게 테스트를 추가할 수 있습니다.

## 🛠️ 기술 스택
- **백엔드 프레임워크**: Nest.js
- **언어**: TypeScript
- **데이터베이스**: MongoDB

감사합니다! 🎉
```
