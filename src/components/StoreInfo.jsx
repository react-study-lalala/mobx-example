import React from "react";
import { inject, observer } from "mobx-react";
import { Card, Image } from "semantic-ui-react";

export default inject('storeStore')(observer(
  function StoreInfo(props){
    const store = props.storeStore.mouseStoreItem;
    return (
      <div id="STORE_INFO" className={ store===null?"":"active"}>
        <Card>
          <Card.Content>
            <Card.Header>{ store===null?"":store.name }&nbsp;</Card.Header>
            <Image src={store===null?"":`/img/${store.type}.png`} size='tiny' floated='left' />
            <small className="info">{ store===null?"":(store.description??"(설명없음)") }</small>
          </Card.Content>
        </Card>
      </div>
    );
  }
));
