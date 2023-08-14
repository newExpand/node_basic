import http from "k6/http";

export const options = {
    vus: 100,
    duration: "10s",
};

export default function () {
    http.get("http://localhost:8080");
}

/*
http_req_duration
=> HTTP 요청 기간에 대한 결과 avg=?s 평균 ?초가 걸렸다는 말, p(90) = ?s 90프로 이상의 요청이 ?초 이하 라는 뜻

http_req_failed
=> HTTP 요청이 얼마나 실패했는지

http_reqs
=> HTTP 요청이 총 몇번 발생했는지

iteration_duration
=> HTTP요청이 한 번 완료되고 다시 시작될 때까지 걸리는 시간
*/
