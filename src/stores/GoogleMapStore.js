import { computed, observable, action, decorate } from "mobx";

const decorators = {
  map: observable,
  markerList: observable,
  isMapLoaded: computed,
  addMarker: action, // 로그인 토큰 확인
}

class GoogleMapStore {
  /** ?? **/
  $storeStore = null;
  
  /** observable **/
  map = null;
  markerList = {};

  /** computed **/
  get isMapLoaded() { return this.googleMap!==null; }

  /** actions **/
  addStoreMarker = (store, idx, $storeStore) => {
    const marker = new window.google.maps.Marker({
      map: this.map,
      icon: `/img/mk-${store.type}.png`,
      opacity: 0.9,
      position: { lat: store.lat, lng: store.lng },
      title: store.name,
    });
    marker._key = store.key;
    marker._index = idx;
    marker.addListener("mouseover", function() {
      marker.setIcon(`/img/mk-${store.type}-on.png`);
      marker.setOpacity(1.0);
      $storeStore.mouseStoreItem = $storeStore.storeList[idx];
    });
    marker.addListener("mouseout", function() {
      marker.setIcon(`/img/mk-${store.type}.png`);
      marker.setOpacity(0.9);
      $storeStore.mouseStoreItem = null;
    });
    marker.addListener("click", function() {
      console.log(marker);
      // this.map.setCenter(marker.getPosition());
    });
    $storeStore.storeList[idx].marker = marker;
    return marker;
  };

  addMarker = (lat, lng, title="T_T") => {
    const marker = new window.google.maps.Marker({
      map: this.map,
      position: { lat, lng },
      title,
    });
    marker.addListener("click", function() {
      // map.setZoom(17);
      this.map.setCenter(marker.getPosition());
    });
    return marker;
  };
  
}

decorate(GoogleMapStore, decorators);

export default new GoogleMapStore();