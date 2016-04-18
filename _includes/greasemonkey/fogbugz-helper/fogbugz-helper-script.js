/*!
 * Autolinker.js
 * 0.25.2
 *
 * Copyright(c) 2016 Gregory Jacobs <greg@greg-jacobs.com>
 * MIT License
 *
 * https://github.com/gregjacobs/Autolinker.js
 */
!function(t,e){"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?module.exports=e():t.Autolinker=e()}(this,function(){var t=function(e){e=e||{},this.version=t.version,this.urls=this.normalizeUrlsCfg(e.urls),this.email="boolean"==typeof e.email?e.email:!0,this.twitter="boolean"==typeof e.twitter?e.twitter:!0,this.phone="boolean"==typeof e.phone?e.phone:!0,this.hashtag=e.hashtag||!1,this.newWindow="boolean"==typeof e.newWindow?e.newWindow:!0,this.stripPrefix="boolean"==typeof e.stripPrefix?e.stripPrefix:!0;var r=this.hashtag;if(r!==!1&&"twitter"!==r&&"facebook"!==r&&"instagram"!==r)throw new Error("invalid `hashtag` cfg - see docs");this.truncate=this.normalizeTruncateCfg(e.truncate),this.className=e.className||"",this.replaceFn=e.replaceFn||null,this.htmlParser=null,this.matchers=null,this.tagBuilder=null};return t.link=function(e,r){var n=new t(r);return n.link(e)},t.version="0.25.2",t.prototype={constructor:t,normalizeUrlsCfg:function(t){return null==t&&(t=!0),"boolean"==typeof t?{schemeMatches:t,wwwMatches:t,tldMatches:t}:{schemeMatches:"boolean"==typeof t.schemeMatches?t.schemeMatches:!0,wwwMatches:"boolean"==typeof t.wwwMatches?t.wwwMatches:!0,tldMatches:"boolean"==typeof t.tldMatches?t.tldMatches:!0}},normalizeTruncateCfg:function(e){return"number"==typeof e?{length:e,location:"end"}:t.Util.defaults(e||{},{length:Number.POSITIVE_INFINITY,location:"end"})},parse:function(t){for(var e=this.getHtmlParser(),r=e.parse(t),n=0,i=[],s=0,a=r.length;a>s;s++){var o=r[s],h=o.getType();if("element"===h&&"a"===o.getTagName())o.isClosing()?n=Math.max(n-1,0):n++;else if("text"===h&&0===n){var c=this.parseText(o.getText(),o.getOffset());i.push.apply(i,c)}}return i=this.compactMatches(i),i=this.removeUnwantedMatches(i)},compactMatches:function(t){t.sort(function(t,e){return t.getOffset()-e.getOffset()});for(var e=0;e<t.length-1;e++)for(var r=t[e],n=r.getOffset()+r.getMatchedText().length;e+1<t.length&&t[e+1].getOffset()<=n;)t.splice(e+1,1);return t},removeUnwantedMatches:function(e){var r=t.Util.remove;return this.hashtag||r(e,function(t){return"hashtag"===t.getType()}),this.email||r(e,function(t){return"email"===t.getType()}),this.phone||r(e,function(t){return"phone"===t.getType()}),this.twitter||r(e,function(t){return"twitter"===t.getType()}),this.urls.schemeMatches||r(e,function(t){return"url"===t.getType()&&"scheme"===t.getUrlMatchType()}),this.urls.wwwMatches||r(e,function(t){return"url"===t.getType()&&"www"===t.getUrlMatchType()}),this.urls.tldMatches||r(e,function(t){return"url"===t.getType()&&"tld"===t.getUrlMatchType()}),e},parseText:function(t,e){e=e||0;for(var r=this.getMatchers(),n=[],i=0,s=r.length;s>i;i++){for(var a=r[i].parseMatches(t),o=0,h=a.length;h>o;o++)a[o].setOffset(e+a[o].getOffset());n.push.apply(n,a)}return n},link:function(t){if(!t)return"";for(var e=this.parse(t),r=[],n=0,i=0,s=e.length;s>i;i++){var a=e[i];r.push(t.substring(n,a.getOffset())),r.push(this.createMatchReturnVal(a)),n=a.getOffset()+a.getMatchedText().length}return r.push(t.substring(n)),r.join("")},createMatchReturnVal:function(e){var r;if(this.replaceFn&&(r=this.replaceFn.call(this,this,e)),"string"==typeof r)return r;if(r===!1)return e.getMatchedText();if(r instanceof t.HtmlTag)return r.toAnchorString();var n=e.buildTag();return n.toAnchorString()},getHtmlParser:function(){var e=this.htmlParser;return e||(e=this.htmlParser=new t.htmlParser.HtmlParser),e},getMatchers:function(){if(this.matchers)return this.matchers;var e=t.matcher,r=this.getTagBuilder(),n=[new e.Hashtag({tagBuilder:r,serviceName:this.hashtag}),new e.Email({tagBuilder:r}),new e.Phone({tagBuilder:r}),new e.Twitter({tagBuilder:r}),new e.Url({tagBuilder:r,stripPrefix:this.stripPrefix})];return this.matchers=n},getTagBuilder:function(){var e=this.tagBuilder;return e||(e=this.tagBuilder=new t.AnchorTagBuilder({newWindow:this.newWindow,truncate:this.truncate,className:this.className})),e}},t.match={},t.matcher={},t.htmlParser={},t.truncate={},t.Util={abstractMethod:function(){throw"abstract"},trimRegex:/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,assign:function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r]);return t},defaults:function(t,e){for(var r in e)e.hasOwnProperty(r)&&void 0===t[r]&&(t[r]=e[r]);return t},extend:function(e,r){var n=e.prototype,i=function(){};i.prototype=n;var s;s=r.hasOwnProperty("constructor")?r.constructor:function(){n.constructor.apply(this,arguments)};var a=s.prototype=new i;return a.constructor=s,a.superclass=n,delete r.constructor,t.Util.assign(a,r),s},ellipsis:function(t,e,r){return t.length>e&&(r=null==r?"..":r,t=t.substring(0,e-r.length)+r),t},indexOf:function(t,e){if(Array.prototype.indexOf)return t.indexOf(e);for(var r=0,n=t.length;n>r;r++)if(t[r]===e)return r;return-1},remove:function(t,e){for(var r=t.length-1;r>=0;r--)e(t[r])===!0&&t.splice(r,1)},splitAndCapture:function(t,e){for(var r,n=[],i=0;r=e.exec(t);)n.push(t.substring(i,r.index)),n.push(r[0]),i=r.index+r[0].length;return n.push(t.substring(i)),n},trim:function(t){return t.replace(this.trimRegex,"")}},t.HtmlTag=t.Util.extend(Object,{whitespaceRegex:/\s+/,constructor:function(e){t.Util.assign(this,e),this.innerHtml=this.innerHtml||this.innerHTML},setTagName:function(t){return this.tagName=t,this},getTagName:function(){return this.tagName||""},setAttr:function(t,e){var r=this.getAttrs();return r[t]=e,this},getAttr:function(t){return this.getAttrs()[t]},setAttrs:function(e){var r=this.getAttrs();return t.Util.assign(r,e),this},getAttrs:function(){return this.attrs||(this.attrs={})},setClass:function(t){return this.setAttr("class",t)},addClass:function(e){for(var r,n=this.getClass(),i=this.whitespaceRegex,s=t.Util.indexOf,a=n?n.split(i):[],o=e.split(i);r=o.shift();)-1===s(a,r)&&a.push(r);return this.getAttrs()["class"]=a.join(" "),this},removeClass:function(e){for(var r,n=this.getClass(),i=this.whitespaceRegex,s=t.Util.indexOf,a=n?n.split(i):[],o=e.split(i);a.length&&(r=o.shift());){var h=s(a,r);-1!==h&&a.splice(h,1)}return this.getAttrs()["class"]=a.join(" "),this},getClass:function(){return this.getAttrs()["class"]||""},hasClass:function(t){return-1!==(" "+this.getClass()+" ").indexOf(" "+t+" ")},setInnerHtml:function(t){return this.innerHtml=t,this},getInnerHtml:function(){return this.innerHtml||""},toAnchorString:function(){var t=this.getTagName(),e=this.buildAttrsStr();return e=e?" "+e:"",["<",t,e,">",this.getInnerHtml(),"</",t,">"].join("")},buildAttrsStr:function(){if(!this.attrs)return"";var t=this.getAttrs(),e=[];for(var r in t)t.hasOwnProperty(r)&&e.push(r+'="'+t[r]+'"');return e.join(" ")}}),t.RegexLib=function(){var t="A-Za-z\\xAA\\xB5\\xBA\\xC0-\\xD6\\xD8-\\xF6\\xF8-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙա-ևא-תװ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠ-ࢴऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚౠౡಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛱ-ᛸᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎↃↄⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々〆〱-〵〻〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿕ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛥꜗ-ꜟꜢ-ꞈꞋ-ꞭꞰ-ꞷꟷ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭥꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ",e="0-9٠-٩۰-۹߀-߉०-९০-৯੦-੯૦-૯୦-୯௦-௯౦-౯೦-೯൦-൯෦-෯๐-๙໐-໙༠-༩၀-၉႐-႙០-៩᠐-᠙᥆-᥏᧐-᧙᪀-᪉᪐-᪙᭐-᭙᮰-᮹᱀-᱉᱐-᱙꘠-꘩꣐-꣙꤀-꤉꧐-꧙꧰-꧹꩐-꩙꯰-꯹０-９",r=t+e,n=new RegExp("["+r+".\\-]*["+r+"\\-]"),i=/(?:international|construction|contractors|enterprises|photography|productions|foundation|immobilien|industries|management|properties|technology|christmas|community|directory|education|equipment|institute|marketing|solutions|vacations|bargains|boutique|builders|catering|cleaning|clothing|computer|democrat|diamonds|graphics|holdings|lighting|partners|plumbing|supplies|training|ventures|academy|careers|company|cruises|domains|exposed|flights|florist|gallery|guitars|holiday|kitchen|neustar|okinawa|recipes|rentals|reviews|shiksha|singles|support|systems|agency|berlin|camera|center|coffee|condos|dating|estate|events|expert|futbol|kaufen|luxury|maison|monash|museum|nagoya|photos|repair|report|social|supply|tattoo|tienda|travel|viajes|villas|vision|voting|voyage|actor|build|cards|cheap|codes|dance|email|glass|house|mango|ninja|parts|photo|press|shoes|solar|today|tokyo|tools|watch|works|aero|arpa|asia|best|bike|blue|buzz|camp|club|cool|coop|farm|fish|gift|guru|info|jobs|kiwi|kred|land|limo|link|menu|mobi|moda|name|pics|pink|post|qpon|rich|ruhr|sexy|tips|vote|voto|wang|wien|wiki|zone|bar|bid|biz|cab|cat|ceo|com|edu|gov|int|kim|mil|net|onl|org|pro|pub|red|tel|uno|wed|xxx|xyz|ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cw|cx|cy|cz|de|dj|dk|dm|do|dz|ec|ee|eg|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sx|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|za|zm|zw)\b/;return{alphaNumericCharsStr:r,domainNameRegex:n,tldRegex:i}}(),t.AnchorTagBuilder=t.Util.extend(Object,{constructor:function(e){t.Util.assign(this,e)},build:function(e){return new t.HtmlTag({tagName:"a",attrs:this.createAttrs(e.getType(),e.getAnchorHref()),innerHtml:this.processAnchorText(e.getAnchorText())})},createAttrs:function(t,e){var r={href:e},n=this.createCssClass(t);return n&&(r["class"]=n),this.newWindow&&(r.target="_blank",r.rel="noopener noreferrer"),r},createCssClass:function(t){var e=this.className;return e?e+" "+e+"-"+t:""},processAnchorText:function(t){return t=this.doTruncate(t)},doTruncate:function(e){var r=this.truncate;if(!r||!r.length)return e;var n=r.length,i=r.location;return"smart"===i?t.truncate.TruncateSmart(e,n,".."):"middle"===i?t.truncate.TruncateMiddle(e,n,".."):t.truncate.TruncateEnd(e,n,"..")}}),t.htmlParser.HtmlParser=t.Util.extend(Object,{htmlRegex:function(){var t=/!--([\s\S]+?)--/,e=/[0-9a-zA-Z][0-9a-zA-Z:]*/,r=/[^\s\0"'>\/=\x01-\x1F\x7F]+/,n=/(?:"[^"]*?"|'[^']*?'|[^'"=<>`\s]+)/,i=r.source+"(?:\\s*=\\s*"+n.source+")?";return new RegExp(["(?:","<(!DOCTYPE)","(?:","\\s+","(?:",i,"|",n.source+")",")*",">",")","|","(?:","<(/)?","(?:",t.source,"|","(?:","("+e.source+")","(?:","\\s*",i,")*","\\s*/?",")",")",">",")"].join(""),"gi")}(),htmlCharacterEntitiesRegex:/(&nbsp;|&#160;|&lt;|&#60;|&gt;|&#62;|&quot;|&#34;|&#39;)/gi,parse:function(t){for(var e,r,n=this.htmlRegex,i=0,s=[];null!==(e=n.exec(t));){var a=e[0],o=e[3],h=e[1]||e[4],c=!!e[2],u=e.index,l=t.substring(i,u);l&&(r=this.parseTextAndEntityNodes(i,l),s.push.apply(s,r)),o?s.push(this.createCommentNode(u,a,o)):s.push(this.createElementNode(u,a,h,c)),i=u+a.length}if(i<t.length){var g=t.substring(i);g&&(r=this.parseTextAndEntityNodes(i,g),s.push.apply(s,r))}return s},parseTextAndEntityNodes:function(e,r){for(var n=[],i=t.Util.splitAndCapture(r,this.htmlCharacterEntitiesRegex),s=0,a=i.length;a>s;s+=2){var o=i[s],h=i[s+1];o&&(n.push(this.createTextNode(e,o)),e+=o.length),h&&(n.push(this.createEntityNode(e,h)),e+=h.length)}return n},createCommentNode:function(e,r,n){return new t.htmlParser.CommentNode({offset:e,text:r,comment:t.Util.trim(n)})},createElementNode:function(e,r,n,i){return new t.htmlParser.ElementNode({offset:e,text:r,tagName:n.toLowerCase(),closing:i})},createEntityNode:function(e,r){return new t.htmlParser.EntityNode({offset:e,text:r})},createTextNode:function(e,r){return new t.htmlParser.TextNode({offset:e,text:r})}}),t.htmlParser.HtmlNode=t.Util.extend(Object,{offset:void 0,text:void 0,constructor:function(e){t.Util.assign(this,e)},getType:t.Util.abstractMethod,getOffset:function(){return this.offset},getText:function(){return this.text}}),t.htmlParser.CommentNode=t.Util.extend(t.htmlParser.HtmlNode,{comment:"",getType:function(){return"comment"},getComment:function(){return this.comment}}),t.htmlParser.ElementNode=t.Util.extend(t.htmlParser.HtmlNode,{tagName:"",closing:!1,getType:function(){return"element"},getTagName:function(){return this.tagName},isClosing:function(){return this.closing}}),t.htmlParser.EntityNode=t.Util.extend(t.htmlParser.HtmlNode,{getType:function(){return"entity"}}),t.htmlParser.TextNode=t.Util.extend(t.htmlParser.HtmlNode,{getType:function(){return"text"}}),t.match.Match=t.Util.extend(Object,{constructor:function(t){this.tagBuilder=t.tagBuilder,this.matchedText=t.matchedText,this.offset=t.offset},getType:t.Util.abstractMethod,getMatchedText:function(){return this.matchedText},setOffset:function(t){this.offset=t},getOffset:function(){return this.offset},getAnchorHref:t.Util.abstractMethod,getAnchorText:t.Util.abstractMethod,buildTag:function(){return this.tagBuilder.build(this)}}),t.match.Email=t.Util.extend(t.match.Match,{constructor:function(e){t.match.Match.prototype.constructor.call(this,e),this.email=e.email},getType:function(){return"email"},getEmail:function(){return this.email},getAnchorHref:function(){return"mailto:"+this.email},getAnchorText:function(){return this.email}}),t.match.Hashtag=t.Util.extend(t.match.Match,{constructor:function(e){t.match.Match.prototype.constructor.call(this,e),this.serviceName=e.serviceName,this.hashtag=e.hashtag},getType:function(){return"hashtag"},getServiceName:function(){return this.serviceName},getHashtag:function(){return this.hashtag},getAnchorHref:function(){var t=this.serviceName,e=this.hashtag;switch(t){case"twitter":return"https://twitter.com/hashtag/"+e;case"facebook":return"https://www.facebook.com/hashtag/"+e;case"instagram":return"https://instagram.com/explore/tags/"+e;default:throw new Error("Unknown service name to point hashtag to: ",t)}},getAnchorText:function(){return"#"+this.hashtag}}),t.match.Phone=t.Util.extend(t.match.Match,{constructor:function(e){t.match.Match.prototype.constructor.call(this,e),this.number=e.number,this.plusSign=e.plusSign},getType:function(){return"phone"},getNumber:function(){return this.number},getAnchorHref:function(){return"tel:"+(this.plusSign?"+":"")+this.number},getAnchorText:function(){return this.matchedText}}),t.match.Twitter=t.Util.extend(t.match.Match,{constructor:function(e){t.match.Match.prototype.constructor.call(this,e),this.twitterHandle=e.twitterHandle},getType:function(){return"twitter"},getTwitterHandle:function(){return this.twitterHandle},getAnchorHref:function(){return"https://twitter.com/"+this.twitterHandle},getAnchorText:function(){return"@"+this.twitterHandle}}),t.match.Url=t.Util.extend(t.match.Match,{constructor:function(e){t.match.Match.prototype.constructor.call(this,e),this.urlMatchType=e.urlMatchType,this.url=e.url,this.protocolUrlMatch=e.protocolUrlMatch,this.protocolRelativeMatch=e.protocolRelativeMatch,this.stripPrefix=e.stripPrefix},urlPrefixRegex:/^(https?:\/\/)?(www\.)?/i,protocolRelativeRegex:/^\/\//,protocolPrepended:!1,getType:function(){return"url"},getUrlMatchType:function(){return this.urlMatchType},getUrl:function(){var t=this.url;return this.protocolRelativeMatch||this.protocolUrlMatch||this.protocolPrepended||(t=this.url="http://"+t,this.protocolPrepended=!0),t},getAnchorHref:function(){var t=this.getUrl();return t.replace(/&amp;/g,"&")},getAnchorText:function(){var t=this.getMatchedText();return this.protocolRelativeMatch&&(t=this.stripProtocolRelativePrefix(t)),this.stripPrefix&&(t=this.stripUrlPrefix(t)),t=this.removeTrailingSlash(t)},stripUrlPrefix:function(t){return t.replace(this.urlPrefixRegex,"")},stripProtocolRelativePrefix:function(t){return t.replace(this.protocolRelativeRegex,"")},removeTrailingSlash:function(t){return"/"===t.charAt(t.length-1)&&(t=t.slice(0,-1)),t}}),t.matcher.Matcher=t.Util.extend(Object,{constructor:function(t){this.tagBuilder=t.tagBuilder},parseMatches:t.Util.abstractMethod}),t.matcher.Email=t.Util.extend(t.matcher.Matcher,{matcherRegex:function(){var e=t.RegexLib.alphaNumericCharsStr,r=new RegExp("["+e+"\\-;:&=+$.,]+@"),n=t.RegexLib.domainNameRegex,i=t.RegexLib.tldRegex;return new RegExp([r.source,n.source,"\\.",i.source].join(""),"gi")}(),parseMatches:function(e){for(var r,n=this.matcherRegex,i=this.tagBuilder,s=[];null!==(r=n.exec(e));){var a=r[0];s.push(new t.match.Email({tagBuilder:i,matchedText:a,offset:r.index,email:a}))}return s}}),t.matcher.Hashtag=t.Util.extend(t.matcher.Matcher,{matcherRegex:new RegExp("#[_"+t.RegexLib.alphaNumericCharsStr+"]{1,139}","g"),nonWordCharRegex:new RegExp("[^"+t.RegexLib.alphaNumericCharsStr+"]"),constructor:function(e){t.matcher.Matcher.prototype.constructor.call(this,e),this.serviceName=e.serviceName},parseMatches:function(e){for(var r,n=this.matcherRegex,i=this.nonWordCharRegex,s=this.serviceName,a=this.tagBuilder,o=[];null!==(r=n.exec(e));){var h=r.index,c=e.charAt(h-1);if(0===h||i.test(c)){var u=r[0],l=r[0].slice(1);o.push(new t.match.Hashtag({tagBuilder:a,matchedText:u,offset:h,serviceName:s,hashtag:l}))}}return o}}),t.matcher.Phone=t.Util.extend(t.matcher.Matcher,{matcherRegex:/(?:(\+)?\d{1,3}[-\040.])?\(?\d{3}\)?[-\040.]?\d{3}[-\040.]\d{4}/g,parseMatches:function(e){for(var r,n=this.matcherRegex,i=this.tagBuilder,s=[];null!==(r=n.exec(e));){var a=r[0],o=a.replace(/\D/g,""),h=!!r[1];s.push(new t.match.Phone({tagBuilder:i,matchedText:a,offset:r.index,number:o,plusSign:h}))}return s}}),t.matcher.Twitter=t.Util.extend(t.matcher.Matcher,{matcherRegex:new RegExp("@[_"+t.RegexLib.alphaNumericCharsStr+"]{1,20}","g"),nonWordCharRegex:new RegExp("[^"+t.RegexLib.alphaNumericCharsStr+"]"),parseMatches:function(e){for(var r,n=this.matcherRegex,i=this.nonWordCharRegex,s=this.tagBuilder,a=[];null!==(r=n.exec(e));){var o=r.index,h=e.charAt(o-1);if(0===o||i.test(h)){var c=r[0],u=r[0].slice(1);a.push(new t.match.Twitter({tagBuilder:s,matchedText:c,offset:o,twitterHandle:u}))}}return a}}),t.matcher.Url=t.Util.extend(t.matcher.Matcher,{matcherRegex:function(){var e=/(?:[A-Za-z][-.+A-Za-z0-9]*:(?![A-Za-z][-.+A-Za-z0-9]*:\/\/)(?!\d+\/?)(?:\/\/)?)/,r=/(?:www\.)/,n=t.RegexLib.domainNameRegex,i=t.RegexLib.tldRegex,s=t.RegexLib.alphaNumericCharsStr,a=new RegExp("["+s+"\\-+&@#/%=~_()|'$*\\[\\]?!:,.;]*["+s+"\\-+&@#/%=~_()|'$*\\[\\]]");return new RegExp(["(?:","(",e.source,n.source,")","|","(","(//)?",r.source,n.source,")","|","(","(//)?",n.source+"\\.",i.source,")",")","(?:"+a.source+")?"].join(""),"gi")}(),wordCharRegExp:/\w/,openParensRe:/\(/g,closeParensRe:/\)/g,constructor:function(e){t.matcher.Matcher.prototype.constructor.call(this,e),this.stripPrefix=e.stripPrefix},parseMatches:function(e){for(var r,n=this.matcherRegex,i=this.stripPrefix,s=this.tagBuilder,a=[];null!==(r=n.exec(e));){var o=r[0],h=r[1],c=r[2],u=r[3],l=r[5],g=r.index,f=u||l,m=e.charAt(g-1);if(t.matcher.UrlMatchValidator.isValid(o,h)&&!(g>0&&"@"===m||g>0&&f&&this.wordCharRegExp.test(m))){if(this.matchHasUnbalancedClosingParen(o))o=o.substr(0,o.length-1);else{var p=this.matchHasInvalidCharAfterTld(o,h);p>-1&&(o=o.substr(0,p))}var d=h?"scheme":c?"www":"tld",x=!!h;a.push(new t.match.Url({tagBuilder:s,matchedText:o,offset:g,urlMatchType:d,url:o,protocolUrlMatch:x,protocolRelativeMatch:!!f,stripPrefix:i}))}}return a},matchHasUnbalancedClosingParen:function(t){var e=t.charAt(t.length-1);if(")"===e){var r=t.match(this.openParensRe),n=t.match(this.closeParensRe),i=r&&r.length||0,s=n&&n.length||0;if(s>i)return!0}return!1},matchHasInvalidCharAfterTld:function(t,e){if(!t)return-1;var r=0;e&&(r=t.indexOf(":"),t=t.slice(r));var n=/^((.?\/\/)?[A-Za-z0-9\u00C0-\u017F\.\-]*[A-Za-z0-9\u00C0-\u017F\-]\.[A-Za-z]+)/,i=n.exec(t);return null===i?-1:(r+=i[1].length,t=t.slice(i[1].length),/^[^.A-Za-z:\/?#]/.test(t)?r:-1)}}),t.matcher.UrlMatchValidator={hasFullProtocolRegex:/^[A-Za-z][-.+A-Za-z0-9]*:\/\//,uriSchemeRegex:/^[A-Za-z][-.+A-Za-z0-9]*:/,hasWordCharAfterProtocolRegex:/:[^\s]*?[A-Za-z\u00C0-\u017F]/,isValid:function(t,e){return!(e&&!this.isValidUriScheme(e)||this.urlMatchDoesNotHaveProtocolOrDot(t,e)||this.urlMatchDoesNotHaveAtLeastOneWordChar(t,e))},isValidUriScheme:function(t){var e=t.match(this.uriSchemeRegex)[0].toLowerCase();return"javascript:"!==e&&"vbscript:"!==e},urlMatchDoesNotHaveProtocolOrDot:function(t,e){return!(!t||e&&this.hasFullProtocolRegex.test(e)||-1!==t.indexOf("."))},urlMatchDoesNotHaveAtLeastOneWordChar:function(t,e){return t&&e?!this.hasWordCharAfterProtocolRegex.test(t):!1}},t.truncate.TruncateEnd=function(e,r,n){return t.Util.ellipsis(e,r,n)},t.truncate.TruncateMiddle=function(t,e,r){if(t.length<=e)return t;var n=e-r.length,i="";return n>0&&(i=t.substr(-1*Math.floor(n/2))),(t.substr(0,Math.ceil(n/2))+r+i).substr(0,e)},t.truncate.TruncateSmart=function(t,e,r){var n=function(t){var e={},r=t,n=r.match(/^([a-z]+):\/\//i);return n&&(e.scheme=n[1],r=r.substr(n[0].length)),n=r.match(/^(.*?)(?=(\?|#|\/|$))/i),n&&(e.host=n[1],r=r.substr(n[0].length)),n=r.match(/^\/(.*?)(?=(\?|#|$))/i),n&&(e.path=n[1],r=r.substr(n[0].length)),n=r.match(/^\?(.*?)(?=(#|$))/i),n&&(e.query=n[1],r=r.substr(n[0].length)),n=r.match(/^#(.*?)$/i),n&&(e.fragment=n[1]),e},i=function(t){var e="";return t.scheme&&t.host&&(e+=t.scheme+"://"),t.host&&(e+=t.host),t.path&&(e+="/"+t.path),t.query&&(e+="?"+t.query),t.fragment&&(e+="#"+t.fragment),e},s=function(t,e){var n=e/2,i=Math.ceil(n),s=-1*Math.floor(n),a="";return 0>s&&(a=t.substr(s)),t.substr(0,i)+r+a};if(t.length<=e)return t;var a=e-r.length,o=n(t);if(o.query){var h=o.query.match(/^(.*?)(?=(\?|\#))(.*?)$/i);h&&(o.query=o.query.substr(0,h[1].length),t=i(o))}if(t.length<=e)return t;if(o.host&&(o.host=o.host.replace(/^www\./,""),t=i(o)),t.length<=e)return t;var c="";if(o.host&&(c+=o.host),c.length>=a)return o.host.length==e?(o.host.substr(0,e-r.length)+r).substr(0,e):s(c,a).substr(0,e);var u="";if(o.path&&(u+="/"+o.path),o.query&&(u+="?"+o.query),u){if((c+u).length>=a){if((c+u).length==e)return(c+u).substr(0,e);var l=a-c.length;return(c+s(u,l)).substr(0,e)}c+=u}if(o.fragment){var g="#"+o.fragment;if((c+g).length>=a){if((c+g).length==e)return(c+g).substr(0,e);var f=a-c.length;return(c+s(g,f)).substr(0,e)}c+=g}if(o.scheme&&o.host){var m=o.scheme+"://";if((c+m).length<a)return(m+c).substr(0,e)}if(c.length<=e)return c;var p="";return a>0&&(p=c.substr(-1*Math.floor(a/2))),(c.substr(0,Math.ceil(a/2))+r+p).substr(0,e)},t});

(function($) {
'use strict';

// http://stackoverflow.com/questions/822452/strip-html-from-text-javascript
function convertHtmlToText(inputText) {
  var returnText = "" + inputText;

  //-- remove BR tags and replace them with line break
  returnText=returnText.replace(/<br>/gi, "\n");
  returnText=returnText.replace(/<br\s\/>/gi, "\n");
  returnText=returnText.replace(/<br\/>/gi, "\n");

  //-- remove P and A tags but preserve what's inside of them
  returnText=returnText.replace(/<p.*>/gi, "\n");
  returnText=returnText.replace(/<a.*href="(.*?)".*>(.*?)<\/a>/gi, " $2 ($1)");

  //-- remove all inside SCRIPT and STYLE tags
  returnText=returnText.replace(/<script.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/script>/gi, "");
  returnText=returnText.replace(/<style.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/style>/gi, "");
  //-- remove all else
  returnText=returnText.replace(/<(?:.|\s)*?>/g, "");

  //-- get rid of more than 2 multiple line breaks:
  returnText=returnText.replace(/(?:(?:\r\n|\r|\n)\s*){2,}/gim, "\n\n");

  //-- get rid of more than 2 spaces:
  returnText = returnText.replace(/ +(?= )/g,'');

  //-- get rid of html-encoded characters:
  returnText=returnText.replace(/&nbsp;/gi," ");
  returnText=returnText.replace(/&amp;/gi,"&");
  returnText=returnText.replace(/&quot;/gi,'"');
  returnText=returnText.replace(/&lt;/gi,'<');
  returnText=returnText.replace(/&gt;/gi,'>');

  //-- return
  return returnText;
}

var $document;
var $window;

  //////////////////////
 // Sniff for dom mutation events
//////////////////////
var sniff = function(selector, fn, once) {
  once = once || false;
  var running = false;
  var fn_wrap = function() {
    if ( running ) {
      return;
    }

    running = true;

    var ret = fn.apply(this, arguments);

    if ( ret && once ) {
      $document.undelegate('#main', 'DOMNodeInserted DOMNodeRemoved', fn_wrap);
    }

    running = false;

    return ret;
  };

  $document.delegate('#main', 'DOMNodeInserted DOMNodeRemoved', fn_wrap);
};

  //////////////////////
 // Preference manager
//////////////////////
var PreferenceManager = function() {
  this.prefs = {};
  this.loaded = false;
};

PreferenceManager.prototype.set = function(name, value) {
  return localStorage.setItem('fogbugz-helper-' + name, value);
}

PreferenceManager.prototype.get = function(name, defaultOn) {
  var val = JSON.parse(localStorage.getItem('fogbugz-helper-' + name));

  if ( val === null && defaultOn ) {
    val = true;
  }

  return val;
}

PreferenceManager.prototype.add = function(pref) {
  if ( !pref.id ) {
    // Maybe throw an error?
    return;
  }

  this.prefs[pref.id] = pref;
};

PreferenceManager.prototype.load = function() {
  var me = this;
  var pkey;
  var pref;

  if ( me.loaded ) {
    // Maybe throw an error?
    return;
  }

  me.loaded = true;

  var add_prefs = function(force) {
    var $helper_menu = $('#fogbugz-helper-menu');

    force = force || false;

    if ( !force && $helper_menu.length ) {
      // Already added menu
      return;
    } else if ( force ) {
      $helper_menu.empty();
    } else {
      $helper_menu = $('<li/>').attr('id', 'fogbugz-helper-menu');
      // Add a link to plugin homepage
      var $homepage_link = $('<label><a href="http://ziprecruiter.github.io/greasemonkey/fogbugz-helper/" target="_blank">ZipRecruiter FogBugz Helper</a></label>');
      $helper_menu.append($homepage_link);
    }

    // Menu to put checkbox preferences into
    var $prefs_menu = $('<menu/>').attr('id', 'fogbugz-helper-prefs-menu');

    // Menu for features to dump stuff into
    var $features_menu = $('<menu/>').attr('id', 'fogbugz-helper-features-menu');

    // Make preferences
    var $plabel;
    var $pcheck;

    for ( pkey in me.prefs ) {
      pref = me.prefs[pkey];

      $pcheck = $('<input type="checkbox">')
        .attr({
          'id': 'fogbugz-helper-pref-check-' + pref.id
        })
        .data('prefid', pref.id)
        ;

      if ( me.get(pref.id, pref.defaultOn) ) {
        $pcheck.prop('checked', true);
      }

      $plabel = $('<label/>')
        .attr({
          'id': 'fogbugz-helper-pref-' + pref.id,
          'for': 'fogbugz-helper-pref-check-' + pref.id,
          'title': pref.title
        })
        .html(pref.text)
        .prepend($pcheck)
        .appendTo($prefs_menu)
        ;
    }

    $helper_menu
      .append($prefs_menu)
      .append($features_menu)
      .appendTo($('body #header .tools .dropdown-menu'))
      ;

    for ( pkey in me.prefs ) {
      pref = me.prefs[pkey];

      if ( me.get(pref.id, pref.defaultOn) && pref.ontools ) {
        pref.ontools();
      }
    }
  };

  // One-time setup stuff
  $document
    .delegate('.tools', 'mouseover', function() {
      add_prefs();
    })
    // Changing preferences via checkboxes
    .delegate('#fogbugz-helper-prefs-menu input', 'change', function() {
      var $this = $(this);
      var id = $this.data('prefid');
      var pref = me.prefs[id];
      var checked = $this.prop('checked');
      me.set(id, checked);

      if ( !checked && pref.onunload ) {
        pref.onunload();
      } else if ( checked ) {
        if ( pref.onload ) {
          pref.onload();
        }

        if ( pref.ontools ) {
          pref.ontools();
        }
      }
    })
    ;

  for ( pkey in me.prefs ) {
    pref = me.prefs[pkey];

    if ( me.get(pref.id, pref.defaultOn) && pref.onload ) {
      pref.onload();
    }
  }
};

// Make the preference manager
var pm = new PreferenceManager();

  ////////////////////////////
 // (Preference) Use Stylesheet (for debugging)
////////////////////////////
var use_stylesheet = function() {
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.id = 'fogbugz-helper-css';
  document.head.appendChild(link);
  link.href = window.zrBookmarkletUrl + '/fogbugz-helper.css?';
};

var use_style_tag = function() {
  var s = document.createElement('style');
  s.id = 'fogbugz-helper-css';
  s.innerHTML = window.zrBookmarkletCSS;
  document.head.appendChild(s);
}

var onload_use_stylesheet = function() {
  $('#fogbugz-helper-css').remove();
  use_stylesheet();
};

var onunload_use_stylesheet = function() {
  $('#fogbugz-helper-css').remove();
  use_style_tag();
};

pm.add({
  id: 'use_stylesheet',
  text: 'Use Stylesheet (for debugging)',
  title: 'This is for development purposes, you shouldn\'t need to enable it',
  onload: onload_use_stylesheet,
  onunload: onunload_use_stylesheet
});

if ( pm.get('use_stylesheet') ) {
  use_stylesheet();
} else {
  use_style_tag();
}

  //////////////////////
 // Set up and run the features
//////////////////////
var init = function() {
  // Make sure jQuery is loaded before continuing
  if ( !window.jQuery ) {
    setTimeout(init, 10);
    return;
  }

  $ = window.jQuery;

  if ( pm.get('use_stylesheet') ) {
    // Make sure css is loaded before continuing
    var $fogbugz_helper_css = $('#fogbugz-helper-css');
    if ( !$fogbugz_helper_css.length || ($fogbugz_helper_css.css('content') != 'loaded' && $fogbugz_helper_css.css('content') != '"loaded"' && $fogbugz_helper_css.css('content') != "'loaded'") ) {
      setTimeout(init, 10);
      return;
    }
  }

    //////////////////////
   // autosize textarea plugin
  //////////////////////
  $.fn.autosize = function() {
    return this.each(function() {
      var $this = $(this);

      if ( $this.is('.autosize-autosized') ) {
        return;
      }

      $this.addClass('autosize-autosized');

      autosize(this);
    });
  };

  // Run the main functionality
  main($);
}

var main = function($) {
  // Shared Stuff
  var $body = $('body');
  $document = $(document);
  $window = $(window);

    ////////////////////////////
   // (Preference) Hotkeys
  ////////////////////////////

  // Keep this preference first so other preferences can add their own hotkeys

  // http://stackoverflow.com/questions/13992111/javascript-function-to-convert-keycodes-into-characters
  var convertKeyCode = function(evt) {
    var chara = null;
    var keyCode = (evt.which) ? evt.which : evt.keyCode;
    var shift = evt.shiftKey;
    //if (keyCode == 8)
    //  chara = "backspace";
    //  backspace
    //if (keyCode == 9)
    //  chara = "tab";
    //  tab
    //if (keyCode == 13)
    //  chara = "enter";
    //  enter
    if (keyCode == 16)
      chara = "";
    //  chara = "shift";
    //  shift
    //if (keyCode == 17)
    //  chara = "ctrl";
    //  ctrl
    //if (keyCode == 18)
    //  chara = "alt";
    //  alt
    if (keyCode == 19) {
        chara = "PAUSE/BREAK";
    //  pause/break
    //if (keyCode == 20)
    //  chara = "caps lock";
    //  caps lock
    } else if (keyCode == 27) {
      chara = "ESC";
    //  escape
    //if (keyCode == 33)
    //  chara = "page up";
    // page up, to avoid displaying alternate character and confusing people
    //if (keyCode == 34)
    //  chara = "page down";
    // page down
    //if (keyCode == 35)
    //  chara = "end";
    // end
    //if (keyCode == 36)
    //  chara = "home";
    // home
    //if (keyCode == 37)
    //  chara = "left arrow";
    // left arrow
    //if (keyCode == 38)
    //  chara = "up arrow";
    // up arrow
    //if (keyCode == 39)
    //  chara = "right arrow";
    // right arrow
    //if (keyCode == 40)
    //  chara = "down arrow";
    // down arrow
    //if (keyCode == 45)
    //  chara = "insert";
    // insert
    //if (keyCode == 46)
    //  chara = "delete";
    // delete
    // Alphanumeric
    } else if (keyCode == 48) {
        chara = /*(shift) ? ")" :*/ "0";
    } else if (keyCode == 49) {
        chara = /*(shift) ? "!" :*/ "1";
    } else if (keyCode == 50) {
        chara = /*(shift) ? "@" :*/ "2";
    } else if (keyCode == 51) {
        chara = /*(shift) ? "#" :*/ "3";
    } else if (keyCode == 52) {
        chara = /*(shift) ? "$" :*/ "4";
    } else if (keyCode == 53) {
        chara = /*(shift) ? "%" :*/ "5";
    } else if (keyCode == 54) {
        chara = /*(shift) ? "^" :*/ "6";
    } else if (keyCode == 55) {
        chara = /*(shift) ? "&" :*/ "7";
    } else if (keyCode == 56) {
        chara = /*(shift) ? "*" :*/ "8";
    } else if (keyCode == 57) {
        chara = /*(shift) ? "(" :*/ "9";

    } else if (keyCode == 65) {
        chara = /*(shift) ? "A" :*/ "a";
    } else if (keyCode == 66) {
        chara = /*(shift) ? "B" :*/ "b";
    } else if (keyCode == 67) {
        chara = /*(shift) ? "C" :*/ "c";
    } else if (keyCode == 68) {
        chara = /*(shift) ? "D" :*/ "d";
    } else if (keyCode == 69) {
        chara = /*(shift) ? "E" :*/ "e";
    } else if (keyCode == 70) {
        chara = /*(shift) ? "F" :*/ "f";
    } else if (keyCode == 71) {
        chara = /*(shift) ? "G" :*/ "g";
    } else if (keyCode == 72) {
        chara = /*(shift) ? "H" :*/ "h";
    } else if (keyCode == 73) {
        chara = /*(shift) ? "I" :*/ "i";
    } else if (keyCode == 74) {
        chara = /*(shift) ? "J" :*/ "j";
    } else if (keyCode == 75) {
        chara = /*(shift) ? "K" :*/ "k";
    } else if (keyCode == 76) {
        chara = /*(shift) ? "L" :*/ "l";
    } else if (keyCode == 77) {
        chara = /*(shift) ? "M" :*/ "m";
    } else if (keyCode == 78) {
        chara = /*(shift) ? "N" :*/ "n";
    } else if (keyCode == 79) {
        chara = /*(shift) ? "O" :*/ "o";
    } else if (keyCode == 80) {
        chara = /*(shift) ? "P" :*/ "p";
    } else if (keyCode == 81) {
        chara = /*(shift) ? "Q" :*/ "q";
    } else if (keyCode == 82) {
        chara = /*(shift) ? "R" :*/ "r";
    } else if (keyCode == 83) {
        chara = /*(shift) ? "S" :*/ "s";
    } else if (keyCode == 84) {
        chara = /*(shift) ? "T" :*/ "t";
    } else if (keyCode == 85) {
        chara = /*(shift) ? "U" :*/ "u";
    } else if (keyCode == 86) {
        chara = /*(shift) ? "V" :*/ "v";
    } else if (keyCode == 87) {
        chara = /*(shift) ? "W" :*/ "w";
    } else if (keyCode == 88) {
        chara = /*(shift) ? "X" :*/ "x";
    } else if (keyCode == 89) {
        chara = /*(shift) ? "Y" :*/ "y";
    } else if (keyCode == 90) {
        chara = /*(shift) ? "Z" :*/ "z";
    // Alphanumeric
    //} else if (keyCode == 91) {
    //  chara = "left window";
    // left window
    //} else if (keyCode == 92) {
    //  chara = "right window";
    // right window
    //} else if (keyCode == 93) {
    //  chara = "select key";
    // select key
    //} else if (keyCode == 96) {
    //  chara = "numpad 0";
    // numpad 0
    //} else if (keyCode == 97) {
    //  chara = "numpad 1";
    // numpad 1
    //} else if (keyCode == 98) {
    //  chara = "numpad 2";
    // numpad 2
    //} else if (keyCode == 99) {
    //  chara = "numpad 3";
    // numpad 3
    //} else if (keyCode == 100) {
    //  chara = "numpad 4";
    // numpad 4
    //} else if (keyCode == 101) {
    //  chara = "numpad 5";
    // numpad 5
    //} else if (keyCode == 102) {
    //  chara = "numpad 6";
    // numpad 6
    //} else if (keyCode == 103) {
    //  chara = "numpad 7";
    // numpad 7
    //} else if (keyCode == 104) {
    //  chara = "numpad 8";
    // numpad 8
    //} else if (keyCode == 105) {
    //  chara = "numpad 9";
    // numpad 9
    //} else if (keyCode == 106) {
    //  chara = "multiply";
    // multiply
    //} else if (keyCode == 107) {
    //  chara = "add";
    // add
    //} else if (keyCode == 109) {
    //  chara = "subtract";
    // subtract
    //} else if (keyCode == 110) {
    //  chara = "decimal point";
    // decimal point
    //} else if (keyCode == 111) {
    //  chara = "divide";
    // divide
    //} else if (keyCode == 112) {
    //  chara = "F1";
    // F1
    //} else if (keyCode == 113) {
    //  chara = "F2";
    // F2
    //} else if (keyCode == 114) {
    //  chara = "F3";
    // F3
    //} else if (keyCode == 115) {
    //  chara = "F4";
    // F4
    //} else if (keyCode == 116) {
    //  chara = "F5";
    // F5
    //} else if (keyCode == 117) {
    //  chara = "F6";
    // F6
    //} else if (keyCode == 118) {
    //  chara = "F7";
    // F7
    //} else if (keyCode == 119) {
    //  chara = "F8";
    // F8
    //} else if (keyCode == 120) {
    //  chara = "F9";
    // F9
    //} else if (keyCode == 121) {
    //  chara = "F10";
    // F10
    //} else if (keyCode == 122) {
    //  chara = "F11";
    // F11
    //} else if (keyCode == 123) {
    //  chara = "F12";
    // F12
    //} else if (keyCode == 144) {
    //  chara = "num lock";
    // num lock
    //} else if (keyCode == 145) {
    //  chara = "scroll lock";
    // scroll lock
    } else if (keyCode == 186) {
        chara = ";";
    // semi-colon
    } else if (keyCode == 187) {
        chara = "=";
    // equal-sign
    } else if (keyCode == 188) {
        chara = ",";
    // comma
    } else if (keyCode == 189) {
        chara = "-";
    // dash
    } else if (keyCode == 190) {
        chara = ".";
    // period
    } else if (keyCode == 191) {
        chara = (shift) ? "?" : "/";
    // forward slash
    } else if (keyCode == 192) {
        chara = "`";
    // grave accent
    } else if (keyCode == 219) {
        chara = /*(shift) ? "{" :*/ "[";
    // open bracket
    } else if (keyCode == 220) {
        chara = "\\";
    // back slash
    } else if (keyCode == 221) {
        chara = /*(shift) ? "}" :*/ "]";
    // close bracket
    } else if (keyCode == 222) {
        chara = "'";
    // single quote
    }

    return chara;
  }

  var Hotkey = function(hotkey) {
    this.action = hotkey.action;
    this.hotkey = hotkey;
  };

  var default_hotkey_pairs = [
    // Create new case
    {
      text: 'Create Case',
      name: 'create_case',
      keys: 'c',
      allowInput: false,
      action: function() {
        $('.add-case-button').click();
      }
    }
    // Close case
    ,{
      text: 'Close Case or Unfocus Input',
      name: 'close_case_or_unfocus',
      keys: 'ESC',
      allowInput: true,
      action: function(e) {
        if ( $(e.target).is('input, button, textarea, select') ) {
          $(e.target).blur();
        } else {
          $('.js-header-list-cases-link').click();
        }

        $hotkey_wrapper.hide();
      }
    }
    // Search
    ,{
      text: 'Search Cases',
      name: 'search_cases',
      keys: 'gi',
      allowInput: false,
      action: function() {
        $('.search-box').focus();
      }
    }
    // Search
    ,{
      text: 'Quick Search',
      name: 'quick_search',
      keys: '/',
      allowInput: false,
      action: function() {
        $('.search-box').focus();
      }
    }
    // Search
    ,{
      text: 'Search',
      name: 'search',
      keys: 'f',
      allowInput: false,
      action: function() {
        $('.search-box').focus();
      }
    }
    // Hotkey help
    ,{
      text: 'Show Hotkeys',
      name: 'show_hotkeys',
      keys: '?',
      allowInput: false,
      action: function() {
        $hotkey_wrapper.show();
      }
    }
    // Previous case
    ,{
      text: 'Previous Case',
      name: 'previous_case',
      keys: 'j',
      allowInput: false,
      action: function() {
        $('[name="previous-case"]').click();
      }
    }
    // Next case
    ,{
      text: 'Next Case',
      name: 'next_case',
      keys: 'k',
      allowInput: false,
      action: function() {
        $('[name="next-case"]').click();
      }
    }
    // Edit case
    ,{
      text: 'Edit Case',
      name: 'edit_case',
      keys: 'e',
      allowInput: false,
      action: function() {
        $('[name="edit"]').click();
      }
    }
    // Assign case
    ,{
      text: 'Assign Case',
      name: 'assign_case',
      keys: 'a',
      allowInput: false,
      action: function() {
        $('[name="assign"]').eq(0).click();
      }
    }
  ];

  var hotkey_pairs = {};
  var hotkey_chain = '';
  var clear_hotkey_chain_timeout;
  var $hotkey_wrapper = $('<div/>')
    .addClass('fogbugz-helper-hotkeys-wrapper')
    ;

  var hotkey_press = function(e) {
    //expire after focusing anything
    clearTimeout(clear_hotkey_chain_timeout);
    if ( e.altKey || e.ctrlKey || e.metaKey || e.shiftKey ) {
      hotkey_chain = '';
      return;
    }

    var cha = convertKeyCode(e);
    if ( cha === null ) {
      hotkey_chain = '';
      return;
    }

    hotkey_chain += cha;

    if ( hotkey_pairs[hotkey_chain] ) {
      // Make sure not to fire macros while typing comments etc
      if ( !hotkey_pairs[hotkey_chain].hotkey.allowInput && $(e.target).is('input, button, textarea, select') ) {
        hotkey_chain = '';
        return;
      }

      setTimeout(function() {
        hotkey_pairs[hotkey_chain].action(e);
        hotkey_chain = '';
      }, 0);
    } else {
      //expire after a set amount of time
      clear_hotkey_chain_timeout = setTimeout(function() {
        hotkey_chain = '';
      }, 1000);
    }
  };

  var onload_fb_hotkeys = function() {
    $document
      .bind('keydown', hotkey_press)
      ;
  };

  var onunload_fb_hotkeys = function() {
    $document
      .unbind('keydown', hotkey_press)
      ;

    $('.fogbugz-helper-hotkeys-tool').remove();
  };

  var ontools_fb_hotkeys = function() {
    var $hotkeys = $('<div/>')
      .addClass('fogbugz-helper-hotkeys-tool fogbugz-helper-tool')
      ;

    var $headline = $('<a href="#">')
      .addClass('fogbugz-helper-headline')
      .html('Show Hotkeys')
      .appendTo($hotkeys)
      .bind('click', function() {
        $hotkey_wrapper.show();
      })
      ;

    var $menu = $('#fogbugz-helper-features-menu');

    $menu.append($hotkeys);
  }

  var show_hotkeys_popup = function() {
    $hotkey_wrapper
      .show()
      .focus()
      ;
  };

  var build_hotkeys_pop = function() {
    var hotkeys = localStorage.getItem('zr_hotkeys') || '{}';
    hotkeys = JSON.parse(hotkeys);

    var $hotkeys = $('<div/>')
      .addClass('fogbugz-helper-hotkeys-modal')
      ;

    var $headline = $('<h4>')
      .addClass('fogbugz-helper-headline')
      .html('Hotkeys')
      .appendTo($hotkeys)
      ;

    for ( var i = 0, l = default_hotkey_pairs.length, hotkey, keys; i < l; i++ ) {
      hotkey = default_hotkey_pairs[i];
      keys = hotkeys[hotkey.name] || hotkey.keys;

      var $hotkey = $('<div/>')
        .addClass('fogbugz-helper-hotkey')
        ;

      var $input = $('<label>') //$('<input type="text">')
        .attr({
          'id': 'hotkey-' + hotkey.name
        })
        .addClass('fogbugz-helper-hotkey-input-wrapper')
        //.val(keys)
        .html(keys)
        ;

      var $label = $('<label>')
        .attr({
          'for': 'hotkey-' + hotkey.name
        })
        .addClass('fogbugz-helper-hotkey-label')
        .html(hotkey.text)
        ;

      $hotkeys.append(
        $hotkey.append($input, $label)
      );
    }

    var $close = $('<p>')
      .addClass('fogbugz-helper-hotkey-close')
      .html('(click anywhere or press ESC to close)')
      .appendTo($hotkeys)
      ;

    $hotkey_wrapper
      .attr({'tabIndex': 1})
      .hide()
      .empty()
      .append($hotkeys)
      .appendTo('body')
      .bind('click', function() {
        $hotkey_wrapper.hide();
      })
      ;
  };

  var hotkeys = localStorage.getItem('zr_hotkeys') || '{}';
  hotkeys = JSON.parse(hotkeys);

  for ( var i = 0, l = default_hotkey_pairs.length, hotkey, keys; i < l; i++ ) {
    hotkey = default_hotkey_pairs[i];
    keys = hotkeys[hotkey.name] || hotkey.keys;
    hotkey_pairs[keys] = new Hotkey(hotkey);
  }

  build_hotkeys_pop();

  pm.add({
    id: 'fb_hotkeys',
    text: 'Hotkeys',
    title: 'Hotkeys for common actions. May not play nicely with FogBugz\'s built-in hotkeys.',
    defaultOn: false,
    onload: onload_fb_hotkeys,
    ontools: ontools_fb_hotkeys,
    onunload: onunload_fb_hotkeys
  });

    ////////////////////////////
   // (Preference) Autosize Textareas
  ////////////////////////////
  var autosize_textareas = function() {
    var $textareas = $('textarea:not(.autosize-autosized)');
    if ( $textareas.length ) {
      $textareas.autosize();
    }
  };

  var onload_autosize_textareas = function() {
    autosize_textareas();
    $document.delegate('body', 'DOMNodeInserted DOMNodeRemoved', autosize_textareas);
  };

  var onunload_autosize_textareas = function() {
    $document.undelegate('body', 'DOMNodeInserted DOMNodeRemoved', autosize_textareas);
  };

  pm.add({
    id: 'autosize_textareas',
    text: 'Autosize Textareas',
    title: 'Large text fields will automatically expand when type in them',
    defaultOn: true,
    onload: onload_autosize_textareas,
    onunload: onunload_autosize_textareas
  });

    ////////////////////////////
   // (Preference) Background color picker
  ////////////////////////////
  var colors = [
    '#FFFFFF',
    '#3B3B3B',
    '#0079BF',
    '#D29034',
    '#519839',
    '#B04632',
    '#89609E',
    '#CD5A91',
    '#4BBF6B',
    '#00AECC',
    '#838C91'
  ];

  // Get preference
  var color;

  var onload_bgcolors = function() {
    $body.addClass('fogbugz-helper-bgcolors');

    color = localStorage.getItem('color');

    if ( color ) {
      $body.css('background-color', color);
    }
  };

  var onunload_bgcolors = function() {
    $body
      .removeClass('fogbugz-helper-bgcolors')
      .css('background-color', '')
      ;

    $('.fogbugz-helper-colors').remove();
  };

  var ontools_bgcolors = function() {
    var $color_li = $('.fogbugz-helper-colors');

    // Can't figure out why the colors don't stay, we'll just run this function every time and bail if they exist
    if ( $color_li.length ) {
      return;
    }

    $color_li = $('<div/>')
      .addClass('fogbugz-helper-colors fogbugz-helper-tool')
      .delegate('button', 'click', function(e) {
        e.preventDefault();
        var color = $(this).css('background-color');

        localStorage.setItem('color', color);
        $body.css('background-color', color);
        $input.val(color);
      })
      ;

    var $headline = $('<h4>')
      .addClass('fogbugz-helper-headline')
      .html('Choose a background color')
      .appendTo($color_li)
      ;

    // Buttons
    for ( var ci = 0, cl = colors.length, c, $c; ci < cl; ci++ ) {
      c = colors[ci];

      $c = $('<button>&nbsp;</button>')
        .addClass('color')
        .css('background-color', c)
        .appendTo($color_li)
        ;
    }

    // Input
    var $input = $('<input type="text">')
      .val(color)
      .appendTo($color_li)
      .bind('input', function() {
        var color = $(this).val();

        localStorage.setItem('color', color);
        $body.css('background-color', color);
      })
      ;

    var $menu = $('#fogbugz-helper-features-menu');

    $menu.append($color_li);
  };

  pm.add({
    id: 'bgcolors',
    text: 'Background Colors',
    title: 'Enable the color picker to change the background color of FogBugz. Has a few styling issues here and there. If you encounter an issue you can quickly disable it in the FogBugz tools menu.',
    defaultOn: true,
    onload: onload_bgcolors,
    ontools: ontools_bgcolors,
    onunload: onunload_bgcolors
  });

    ////////////////////////////
   // (Preference) Edit Ticket Links
  ////////////////////////////
  var edit_ticket_links = function(e) {
    var href = this.href;

    href = href.replace(/cases\/([0-9]+)/, 'cases/edit/$1');

    this.href = href;
  };

  var onload_edit_ticket_links = function() {
    $document.delegate('a.case', 'mouseover focus', edit_ticket_links);
  };

  var onunload_edit_ticket_links = function() {
    $document.undelegate('a.case', 'mouseover focus', edit_ticket_links);
  };

  pm.add({
    id: 'edit_ticket_links',
    text: 'Edit Ticket Links',
    title: 'When you click on ticket links within FogBugz, they will open in "edit mode." This will not work on links outside of FogBugz yet (like links in emails, etc).',
    defaultOn: true,
    onload: onload_edit_ticket_links,
    onunload: onunload_edit_ticket_links
  });

    ////////////////////////////
   // (Preference) Open Tickets in Modal
  ////////////////////////////

  var $main = $('#main');

  var _close_ticket_modal = function() {
    $('.js-header-list-cases-link').click();
  };

  var close_ticket_modal = function(e) {
    if ( e.target !== this ) {
      return;
    }

    _close_ticket_modal();
  };

  var onload_tickets_in_modal = function() {
    $body.addClass('fogbugz-helper-tickets-in-modal')
    $main.bind('click', close_ticket_modal);
  };

  var onunload_tickets_in_modal = function() {
    $body.removeClass('fogbugz-helper-tickets-in-modal')
    $main.unbind('click', close_ticket_modal);
  };

  pm.add({
    id: 'onunload_tickets_in_modal',
    text: 'Click Backdrop to Close Ticket',
    title: 'Clicking the area behind a ticket will close the ticket and load your last filter.',
    defaultOn: true,
    onload: onload_tickets_in_modal,
    onunload: onunload_tickets_in_modal
  });

    ////////////////////////////
   // (Preference) Auto Sort Tickets
  ////////////////////////////
  var onload_auto_sort = function() {
    $body.addClass('fogbugz-helper-auto-sort');
  };

  var onunload_auto_sort = function() {
    $body.removeClass('fogbugz-helper-auto-sort');
  };

  pm.add({
    id: 'auto_sort',
    text: 'Auto Sort Tickets (by status)',
    title: 'When grouped and sorted by status, ticket groups are arranged in a more logical order. Reverse sorting doesn\'t work yet',
    defaultOn: false,
    onload: onload_auto_sort,
    onunload: onunload_auto_sort
  });

    ////////////////////////////
   // (Preference) Expand Task List
  ////////////////////////////
  var onload_expand_tasks = function() {
    $body.addClass('fogbugz-helper-expand-tasks');
  };

  var onunload_expand_tasks = function() {
    $body.removeClass('fogbugz-helper-expand-tasks');
  };

  pm.add({
    id: 'expand_tasks',
    text: 'Expand Task List Cells',
    title: 'Shows the full text of titles etc. in ticket lists. Each row can be more than one line of text.',
    defaultOn: false,
    onload: onload_expand_tasks,
    onunload: onunload_expand_tasks
  });

    ////////////////////////////
   // (Preference) Ticket Tweaks
  ////////////////////////////
  var onload_ticket_tweaks = function() {
    $body.addClass('fogbugz-helper-ticket-tweaks');
  };

  var onunload_ticket_tweaks = function() {
    $body.removeClass('fogbugz-helper-ticket-tweaks');
  };

  pm.add({
    id: 'ticket_tweaks',
    text: 'Ticket Styling Tweaks',
    title: 'Various ticket styling changes to make tickets work a little better in smaller windows, etc.',
    defaultOn: true,
    onload: onload_ticket_tweaks,
    onunload: onunload_ticket_tweaks
  });

    ////////////////////////////
   // (Preference) Fake Kanban
  ////////////////////////////
  var _fake_kanban_class = 'fogbugz-helper-fake-kanban';
  var _fake_kanban_sorted_class = 'fogbugz-helper-fake-kanban-sorted';

  /* Not used, but this is how I figured out FB's event names

  var _sub = fb.pubsub.subscribe;

  fb.pubsub.subscribe = function(name, fun) {
    console.log(name);
    _sub(name, fun);
    _sub(name, function(m, d) {
      console.log(m, d);
      console.log($('#filter-description-sort').children().length);
    });
    //console.log(document.getElementById('filter-description-sort'));
  };*/

  /*var _pub = fb.pubsub.publish;

  fb.pubsub.publish = function(name) {
    console.log(arguments);
    _pub.apply(window, arguments);
    console.log($('#filter-description-sort').children().length);
  };*/

  var _fake_kanban_template_inserted = function(r, data) {
    if ( $('.list-group-header').children().length > 2 ) {
      $body.addClass(_fake_kanban_sorted_class);
    } else {
      $body.removeClass(_fake_kanban_sorted_class);
    }
  };

  var onload_fake_kanban = function() {
    $body.addClass(_fake_kanban_class);

    fb.pubsub.subscribe("/template/inserted", _fake_kanban_template_inserted);

    _fake_kanban_template_inserted();
  };

  var onunload_fake_kanban = function() {
    $body.removeClass(_fake_kanban_class);

    fb.pubsub.unsubscribe("/template/inserted", _fake_kanban_template_inserted);

    $body.removeClass(_fake_kanban_sorted_class);
  };

  pm.add({
    id: 'fake_kanban',
    text: 'Kanban-Style Ticket Listing',
    title: 'Changes ticket listings to be similar to the FogBugz Kanban board. Drag n drop to come...',
    defaultOn: false,
    onload: onload_fake_kanban,
    onunload: onunload_fake_kanban
  });

    ////////////////////////////
   // (Preference) Reverse Comments
  ////////////////////////////
  var onload_reverse_comments = function() {
    $body.addClass('fogbugz-helper-reverse-comments');
  };

  var onunload_reverse_comments = function() {
    $body.removeClass('fogbugz-helper-reverse-comments');
  };

  pm.add({
    id: 'reverse_comments',
    text: 'Reverse Comment Order on Tickets',
    title: 'Pretty self explanatory',
    defaultOn: false,
    onload: onload_reverse_comments,
    onunload: onunload_reverse_comments
  });

    ////////////////////////////
   // Hide Useless Stuff
  ////////////////////////////
  var onload_hide_stuff = function() {
    $body.addClass('fogbugz-helper-hide-stuff');
  };

  var onunload_reverse_comments = function() {
    $body.removeClass('fogbugz-helper-hide-stuff');
  };

  pm.add({
    id: 'hide_stuff',
    text: 'Hide Unused FogBugz Stuff',
    title: 'I don\'t use these anyway. Hollar if you like this but want something specific back.',
    defaultOn: false,
    onload: onload_hide_stuff,
    onunload: onunload_reverse_comments
  });

    ////////////////////////////
   // WYSIWYG for custom inputs
  ////////////////////////////
  var decodeEntities = (function() {
    // this prevents any overhead from creating the object each time
    var $div = $('<div>');
    var txt = document.createElement('textarea');

    function decodeHTMLEntities (str) {
      txt.innerHTML = str;
      str = txt.value;
      str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
      $div.html(str);

      var $imgs = $div.find('img');
      for ( var i = 0, l = $imgs.length; i < l; i++ ) {
        var $img = $imgs.eq(i);
        var src = $img.attr('src');
        $img.wrap('<a href="' + src + '" target="_blank"></a>');
      }

      str = $div.html();

      return str;
    }

    return decodeHTMLEntities;
  })();

  // Toggle
  var $wysiwyg_toggle;

  var wysiwyg_add = function(force) {
    force = force || false;
    var $customfield = $('.customfield-longtext');
    var $textarea = $customfield.find('textarea.wysiwygified');

    // Edit
    if ( $textarea.length ) {
      // replace textarea with ckeditor
      var code = $.trim($textarea.val());

      if ( !force && (code.charAt(0) != '<' || code.charAt(code.length - 1) != '>') ) {
        //$textarea.val( code.replace(/\n/g, '<br>') );
        $wysiwyg_toggle.find('.wysiwyg_toggle_plain').addClass('wysiwyg_toggle_selected');
      } else {
        if ( force ) {
          $textarea.val($textarea.val().replace(/\n/g, '<br>'));
        }

        wysiwyg_textarea($textarea);
        $wysiwyg_toggle.find('.wysiwyg_toggle_rich').addClass('wysiwyg_toggle_selected');
      }
    }
  };

  var wysiwyg_remove = function() {
    wysiwygify_editor.destroy(true);
    wysiwygify_editor = null;
    var $textarea = $('textarea.wysiwygified');
    var converted = decodeEntities(convertHtmlToText($textarea.val()));
    $textarea.val($.trim(converted));
  };

  var wysiwyg_toggle_off = function() {
    $wysiwyg_toggle.find('label').removeClass('wysiwyg_toggle_selected');
  };

  $body
    .delegate('.wysiwyg_toggle .wysiwyg_toggle_plain:not(.wysiwyg_toggle_selected)', 'click', function(ev) {
      ev.preventDefault();
      if ( !confirm('Lose formatting and switch to plain-text mode?') ) {
        return;
      }

      var $this = $(this);
      wysiwyg_toggle_off();
      wysiwyg_remove();
      $this.addClass('wysiwyg_toggle_selected');
    })
    .delegate('.wysiwyg_toggle .wysiwyg_toggle_rich:not(.wysiwyg_toggle_selected)', 'click', function(ev) {
      ev.preventDefault();
      var $this = $(this);
      wysiwyg_toggle_off();
      wysiwyg_add(true);
      $this.addClass('wysiwyg_toggle_selected');
    })
    .delegate('.wysiwyg_toggle .wysiwyg_toggle_markdown:not(.wysiwyg_toggle_selected)', 'click', function(ev) {
      ev.preventDefault();
      alert('Not yet');
      return;
      var $this = $(this);
      wysiwyg_toggle_off();
      $this.addClass('wysiwyg_toggle_selected');
    })
    ;

  // Make wysiwyg editor
  var wysiwygify_editor;
  var wysiwygify_config = {
    customConfig: "{0}config_MVC.js".format(window.CKEDITOR_BASEPATH)
  };

  var wysiwyg_textarea = function($textarea) {
    wysiwygify_editor = CKEDITOR.replace($textarea.attr('id'), wysiwygify_config);
    wysiwygify_editor.addCss('pre {\
      background: #eee;\
      border-radius: 3px;\
      padding: 10px;\
      display: table;\
      font-family: monospace;\
    }');
  };

  var wysiwygify = function() {
    var $customfield = $('.customfield-longtext');
    var $textarea = $customfield.find('textarea:not(.wysiwygified)').addClass('wysiwygified');

    // Edit
    if ( $textarea.length ) {
      $wysiwyg_toggle = $('<div class="wysiwyg_toggle">\
        <label class="wysiwyg_toggle_plain">Plain text</label>\
        <!-- label class="wysiwyg_toggle_markdown">Markdown</label -->\
        <label class="wysiwyg_toggle_rich">Rich text</label>\
      </div>')
      .insertBefore($textarea);

      wysiwyg_add();
    // Show
    } else if ( $customfield.length ) {
      // See if the case summary is there
      var $content = $customfield.find('.content:not(.wysiwygified)').addClass('wysiwygified');

      if ( $content.length ) {
        var $pre = $content.find('pre');
        var code = $pre.text();

        code = $.trim(Autolinker.link(code, {stripPrefix: false}));

        if ( code.charAt(0) === '<' && code.charAt(code.length - 1) === '>' && code.charAt(1) !== 'a' && code.charAt(code.length - 2) !== 'a' ) {
          var $div = $('<div/>')
            .addClass('wysiwygified_content')
            .html( decodeEntities(code) )
            .insertAfter($pre);

          $pre.hide();
        }
      }
    }
  };

  var onload_wysiwygify = function() {
    wysiwygify();
    $document.delegate('body', 'DOMNodeInserted DOMNodeRemoved', wysiwygify);
  };

  var onunload_wysiwygify = function() {
    // TODO: Unload CKEDITOR instances
    if ( wysiwygify_editor && wysiwygify_editor.name ) {
      wysiwygify_editor.destroy(true);
      //CKEDITOR.instances[wysiwygify_editor.name].destroy(true);
      wysiwygify_editor = null;
      var $textarea = $('textarea.wysiwygified');
      if ( $textarea.length ) {
        var val = $textarea.val();

        $wysiwyg_toggle.remove();

        $textarea
          .removeClass('wysiwygified')
          .val(convertHtmlToText(val))
          ;
      }
    }

    $document.undelegate('body', 'DOMNodeInserted DOMNodeRemoved', wysiwygify);
  };

  pm.add({
    id: 'wysiwygify',
    text: 'Rich Text on Case Summary',
    title: 'Makes the Case Summary textarea "rich text" formattable',
    defaultOn: false,
    onload: onload_wysiwygify,
    onunload: onunload_wysiwygify
  });

  // Set up all the preferences
  pm.load();
};

// Attempt to run the code
init();

})();
