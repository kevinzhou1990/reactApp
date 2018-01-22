import ApiMap from '../../lib/Api/ApiMap';
import {fetchTemplate} from '../../lib/Util';


let DB = {
    reimSetting : fetchTemplate(ApiMap.reimSetting),
    reimSettingUpdate:fetchTemplate(ApiMap.reimSettingUpdate)
};
export default DB;
