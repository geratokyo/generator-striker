import * as React from 'react';
import { Button } from '../Button/Button';
import { DP } from '../../../constants';
import { Translation } from '../../../models/models';
import { EmbedCode } from '../EmbedCode/EmbedCode';
import { IS_SAFARI, IS_MOBILE } from '../../../config';

export function SHOW_EMBED_DIALOG(locale: Translation) {
    DP.show((res, rej) => {
        return (
            // <VerticalAligner>
                <div className="embed-container container">
    
                    <div className="row">
                        <div className="col s12">
                            <h1 className="dialog__header center">{locale.embedCopyTitle}</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12">
                            <EmbedCode
                                locale={locale}
                                height={600} />
                        </div>
                    </div>
    
                </div>
            // </VerticalAligner>
        )
    }, { className: "dialog--normal" })
}

export function SHOW_INFO_DIALOG(locale: Translation) {
    let infoHtml = { __html: locale.informationCopy }
    DP.show((res, rej) => {
        return (
            // <VerticalAligner>
                <div className="info-container container">
    
                    <div className="row">
                        <div className="col s12">
                            <h1 className="center dialog__header">{locale.infoTitle}</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="center col s12 m8 offset-m2" dangerouslySetInnerHTML={infoHtml}></div>
                    </div>
                </div>
            // </VerticalAligner>
        )
    }, { className: "dialog--normal" })
}

