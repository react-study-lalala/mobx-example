import { computed, observable, action, decorate } from "mobx";

const decorators = {
  storeList: observable,
  mouseStoreItem: observable,
  isEmpty: computed,
  getData: action, // 로그인 토큰 확인
}

class StoreStore {
  /** observable **/
  storeList = [];
  mouseStoreItem = null;

  /** computed **/
  get isEmpty(){
    return (this.storeList.length === 0)
  }

  /** actions **/
  getData(){
    // 원래는 Firebase DB에 접속해서 가게 목록 가져오기
    const sampleDataStr= `[{"key":"eR1P1LuHtV6Zeq7gdcPw","lng":126.7277096,"name":"생고기 제작소","lat":37.4907466,"type":"gogi","description":"회식장소. 무한리필 소고기가 2만원대!"},{"key":"jDBIycsZGviMI91BwkTb","name":"마초 불고기","lng":126.72501746857833,"type":"bob","description":"무인(키오스크) 주문, 가격이 매우 저렴하며 불고기가 절대 맛없지 않다.","lat":37.49381763345007,"link":"https://blog.naver.com/denlyou/221938015367"},{"key":"m3WIqj53yNfNH0A3Z1XE","type":"bob","lng":126.7256179,"lat":37.4931948,"name":"The 진국","description":"순대국이 가성비가 좋음, 밑반찬인 부추무침이 짭조름한게 중독성있음"},{"key":"otKkIM2m41LQL1Ga0F01","description":"밥이 돌솥비빔밥(쇠솥이지만)으로 나오는 생선구이집","lat":37.4928448,"name":"꾸이꾸이","type":"fish","lng":126.7225799}]`;
    setTimeout(t=>{ 
      const sampleData = JSON.parse(sampleDataStr);
      for (const storeItem of sampleData) {
        this.storeList.push(storeItem);
      }
      console.log(this.storeList);
    }, 500);
  }
}

decorate(StoreStore, decorators);

export default new StoreStore();