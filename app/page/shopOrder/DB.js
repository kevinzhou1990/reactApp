import ApiMap from '../../lib/Api/ApiMap';
import {fetchTemplate, exportTemplate} from '../../lib/Util';


let DB = {
  shopOrderList: fetchTemplate(ApiMap.shopOrderList),
  exportData: exportTemplate(ApiMap.shopOrderExport)
};
export default DB;
