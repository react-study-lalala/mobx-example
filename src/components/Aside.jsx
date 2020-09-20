import React from 'react';
import { inject, observer } from 'mobx-react';
import { Card, Image, Divider } from 'semantic-ui-react';

export default inject('storeStore')(observer(
  class Aside extends React.Component {
    render(){
      const $storeStore = this.props.storeStore;
      const $hoverItem = $storeStore.mouseStoreItem;
      return (
        <div id="ASIDE">
          <h1 className="text-center">부평 밥지도</h1>
          <Divider />
          { $storeStore.storeList.map( (store, idx) => (
            <Card key={ store.key } 
              color={($hoverItem!==null&&$hoverItem.key===store.key)?"teal":"grey"}
              fluid
            >
              <Card.Content>
                <Image 
                  src={`/img/${store.type}.png`}
                  data-idx={ idx }
                  onMouseOver={ this.handleMouseOver }
                  onMouseOut={ this.handleMouseOut }
                  size='tiny' floated='left'
                />
                <Card.Header>{ store.name }</Card.Header>
                <small className="info">{ store.description??"(설명없음)" }</small>
              </Card.Content>
            </Card>
          ) ) }
        </div>
      );
    }// END render();

    /** 마우스가 over/out시 마커 변화 **/
    handleMouseOver= event => {
      const idx = event.target.getAttribute("data-idx");
      const store = this.props.storeStore.storeList[idx];
      store.marker.setIcon(`/img/mk-${store.type}-on.png`);
    }
    handleMouseOut= event => {
      const idx = event.target.getAttribute("data-idx");
      const store = this.props.storeStore.storeList[idx];
      store.marker.setIcon(`/img/mk-${store.type}.png`);
    }
  }
));