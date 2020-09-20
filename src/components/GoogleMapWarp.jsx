import React from 'react';
import { inject, observer } from 'mobx-react';

export default inject('googleMapStore', 'storeStore')(observer(
  class GoogleMapWrap extends React.Component {
    render(){
      return ( <div id="GOOGLE_MAP" /> );
    }

    // @lifecycle
    componentDidMount() {
      // 구글맵 초기화 // https://developers.google.com/maps/documentation/javascript/tutorial
      const googleMapKey = "googleMapKey";
      if (!window.google) {
        const s = document.createElement("script");
        s.type = "text/javascript";
        s.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapKey}`;
        const x = document.getElementsByTagName("script")[0];
        x.parentNode.insertBefore(s, x);
        s.addEventListener("load", e => this.onMapScriptLoad() );
      } else {
        this.onMapScriptLoad();
      }
    }

    // 구글맵 스크립트가 로딩되면
    onMapScriptLoad(initLat=37.49394, initLng=126.725857) {
      // 사용할 MobX 스토어
      const $googleMapStore = this.props.googleMapStore;
      const $storeStore = this.props.storeStore;
      // 지도 초기화 옵션
      const options = {
        zoom: 17,
        center: { lat: initLat, lng: initLng },
      };
      $googleMapStore.map = new window.google.maps.Map( document.getElementById("GOOGLE_MAP"), options );
      // 테스트 마커 추가 + 클릭 위치 좌표 구하기
      this.addTestMarker($googleMapStore);
      // 상정 마커 로딩
      const delay = setInterval(()=>{
        console.log("delay");
        if( $storeStore.isEmpty === false){
          for (let i = 0; i < $storeStore.storeList.length; i++) {
            const store = $storeStore.storeList[i];
            $googleMapStore.markerList[store.key] = $googleMapStore.addStoreMarker(store, i, $storeStore);
          }
          clearInterval(delay);
        }
      }, 500);
    }

    addTestMarker($googleMapStore){
      // 마커 추가 테스트
      $googleMapStore.markerList["office"] = $googleMapStore.addMarker(37.49394, 126.725857, "제작자 사무실"); // 사무실
      // 클릭 위치 좌표 구하기
      window.google.maps.event.addListener($googleMapStore.map, 'click', function(event) {
        console.log(event.latLng.lat() +", "+ event.latLng.lng());
        // placeMarker(event.latLng);
      });
    }
  }
));
