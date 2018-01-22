import ApiMap from '../../lib/Api/ApiMap';
import {fetchTemplate, exportTemplate} from '../../lib/Util';


let DB = {
    claimCalculation: fetchTemplate(ApiMap.claimCalculation),
    claimCalculationRefund:fetchTemplate(ApiMap.claimCalculationRefund)
};
export default DB;
