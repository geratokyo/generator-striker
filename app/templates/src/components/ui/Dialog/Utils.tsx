import * as React from 'react';
import { Button } from '../Button/Button';
import { DP } from '../../../constants';
import { Translation } from '../../../models/models';
import { EmbedCode } from '../EmbedCode/EmbedCode';
import { IS_SAFARI, IS_MOBILE } from '../../../config';

export function SHOW_EMBED_DIALOG(locale:Translation){
    DP.show((res,rej)=>{
        return (
            <div className="embed-container">
                <h1>{locale.embedCopyTitle}</h1>
                <EmbedCode
                    locale={locale}
                    height={600}/>

            </div>
        )
    }, {className:"embed-dialog-container"})
}

export function SHOW_INFO_DIALOG(locale:Translation){
    let infoHtml = {__html: locale.informationCopy}
    DP.show((res,rej)=>{
        return (
            <div className="info-container">
                <h3 className="center">{locale.infoTitle}</h3>
                <div className="center" dangerouslySetInnerHTML={infoHtml}></div>
            </div>
        )
    })
}
