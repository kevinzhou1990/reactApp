import ApiMap from '../../lib/Api/ApiMap';
import {fetchTemplate, exportTemplate} from '../../lib/Util';


let DB = {
  adminOpinsReimList: fetchTemplate(ApiMap.adminOpinsReimList),
  reimDetail:fetchTemplate(ApiMap.reimDetail),
  exportData: exportTemplate(ApiMap.reimExport)
};
export default DB;
