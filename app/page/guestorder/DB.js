import ApiMap from '../../lib/Api/ApiMap';
import {fetchTemplate, exportTemplate} from '../../lib/Util';

let DB = {
  shopGuestorderList: fetchTemplate(ApiMap.shopGuestorderList),
  fetchArealist: fetchTemplate(ApiMap.getArealist),
  fetchListbyareastation: fetchTemplate(ApiMap.listbyareastation),
  shopGuestorderAssign: fetchTemplate(ApiMap.shopGuestorderAssign),
  shopGuestorder: fetchTemplate(ApiMap.shopGuestorder),
  exportData: exportTemplate(ApiMap.shopGuestorderExport)
};
export default DB;
