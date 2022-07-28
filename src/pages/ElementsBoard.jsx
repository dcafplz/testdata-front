import React from "react";
import Elements from "./Elements";

function ElementsBoard({ item, onRemove }){

    return (
        <div>
            <h1>생성을 원하는 데이터를 입력하세요</h1>
            {item.map((i => <Elements item={i} key={i.id} onRemove={onRemove}/>))}
        </div>
    )

}

export default ElementsBoard;