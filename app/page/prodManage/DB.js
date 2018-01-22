import ApiMap from '../../lib/Api/ApiMap';
import {fetchTemplate, exportTemplate} from '../../lib/Util';

let DB = {
  fetchProdList: fetchTemplate(ApiMap.shopProdList),
  fetchShopProdmeta: fetchTemplate(ApiMap.shopProdmeta),
  fetchStationProdList: fetchTemplate(ApiMap.shopStationProdList),
  updateStationProd: fetchTemplate(ApiMap.stationProdUpdate),
  deleteStationProd: fetchTemplate(ApiMap.stationProdDelete),
  stationProdCreate: fetchTemplate(ApiMap.stationProdCreate),
  shopProdInfo: fetchTemplate(ApiMap.shopProdInfo),
  exportData: exportTemplate(ApiMap.stationProdExport)
};
export default DB;
