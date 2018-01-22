(function(root, factory) {
  if (typeof define == 'function' && define.amd) {
    // AMD
    define(['lodash'], factory);
  } else if (typeof exports == 'object') {
    // Node, CommonJS之类的
    module.exports = factory('lodash');
  } else {
    // 浏览器全局变量(root 即 window)
    root.Util = factory(root._);
  }
}(this, function(_) {

  function childHealthCheckRecordsTwo(data) {
    var january = {
      "createDate": {
        key: '40001',
        value: ''
      },
      "onemWeight": {
        key: '40005',
        value: ''
      },
      "onemWeight_top": {
        key: '40006',
        value: ''
      },
      "onemWeight_middle": {
        key: '40007',
        value: ''
      },
      "onemWeight_bottom": {
        key: '40008',
        value: ''
      },
      "onemHeight": {
        key: '40021',
        value: ''
      },
      "onemHeight_top": {
        key: '40022',
        value: ''
      },
      "onemHeight_middle": {
        key: '40023',
        value: ''
      },
      "onemHeight_bottom": {
        key: '40024',
        value: ''
      },
      "onemHeadLength": {
        key: '40037',
        value: ''
      },
      "onemComplexion_one": {
        key: '40041',
        value: ''
      },
      "onemComplexion_two": {
        key: '40042',
        value: ''
      },
      "onemComplexion_three": {
        key: '40043',
        value: ''
      },
      "onemSkinStr_one": {
        key: '40051',
        value: ''
      },
      "onemSkinStr_two": {
        key: '40052',
        value: ''
      },
      "bregExce_one": {
        key: '40059',
        value: ''
      },
      "bregExce_two": {
        key: '40060',
        value: ''
      },
      "bregExce_three": {
        key: '40061',
        value: ''
      },
      "bregExce_four": {
        key: '40062',
        value: ''
      },
      "neckMass_one": {
        key: '40075',
        value: ''
      },
      "neckMass_two": {
        key: '40076',
        value: ''
      },
      "eye_one": {
        key: '40081',
        value: ''
      },
      "eye_two": {
        key: '40082',
        value: ''
      },
      "ear_one": {
        key: '40089',
        value: ''
      },
      "ear_two": {
        key: '40090',
        value: ''
      },
      "mouth_one": {
        key: '40099',
        value: ''
      },
      "mouth_two": {
        key: '40100',
        value: ''
      },
      "chest_one": {
        key: '40105',
        value: ''
      },
      "chest_two": {
        key: '40106',
        value: ''
      },
      "abdomen_one": {
        key: '40113',
        value: ''
      },
      "abdomen_two": {
        key: '40114',
        value: ''
      },
      "umb_one": {
        key: '40121',
        value: ''
      },
      "umb_two": {
        key: '40122',
        value: ''
      },
      "umb_three": {
        key: '40123',
        value: ''
      },
      "umb_four": {
        key: '40124',
        value: ''
      },
      "limb_one": {
        key: '40127',
        value: ''
      },
      "limb_two": {
        key: '40128',
        value: ''
      },
      "anus_one": {
        key: '40163',
        value: ''
      },
      "anus_two": {
        key: '40164',
        value: ''
      },
      "onemOutdoorActivities": {
        key: '40173',
        value: ''
      },
      "onemVitamind": {
        key: '40177',
        value: ''
      },
      "motorDev_one": {
        key: '40181',
        value: ''
      },
      "motorDev_two": {
        key: '40182',
        value: ''
      },
      "periodIll_one": {
        key: '40189',
        value: ''
      },
      "periodIll_two": {
        key: '40190',
        value: ''
      },
      "periodIll_three": {
        key: '40191',
        value: ''
      },
      "periodIll_four": {
        key: '40192',
        value: ''
      },
      "periodIll_five": {
        key: '40193',
        value: ''
      },
      "periodIll_six": {
        key: '40194',
        value: ''
      },
      "periodIll_seven": {
        key: '40195',
        value: ''
      },
      "periodIll_eight": {
        key: '40196',
        value: ''
      },
      "periodIll_nine": {
        key: '40197',
        value: ''
      },
      "referral_one": {
        key: '40225',
        value: ''
      },
      "referral_two": {
        key: '40226',
        value: ''
      },
      "referral_three": {
        key: '40227',
        value: ''
      },
      "referral_four": {
        key: '40228',
        value: ''
      },
      "healthGuide_one": {
        key: '40241',
        value: ''
      },
      "healthGuide_two": {
        key: '40242',
        value: ''
      },
      "healthGuide_three": {
        key: '40243',
        value: ''
      },
      "healthGuide_four": {
        key: '40244',
        value: ''
      },
      "healthGuide_five": {
        key: '40245',
        value: ''
      },
      "healthGuide_six": {
        key: '40246',
        value: ''
      },
      "healthGuide_seven": {
        key: '40247',
        value: ''
      },
      "nextVisitDate": {
        key: '40269',
        value: ''
      },
      "onemVisitDoctor": {
        key: '40273',
        value: ''
      }
    };

    var march = {
      "createDate": {
        key: '40002',
        value: ''
      },
      "onemWeight": {
        key: '40009',
        value: ''
      },
      "onemWeight_top": {
        key: '40010',
        value: ''
      },
      "onemWeight_middle": {
        key: '40011',
        value: ''
      },
      "onemWeight_bottom": {
        key: '40012',
        value: ''
      },
      "onemHeight": {
        key: '40025',
        value: ''
      },
      "onemHeight_top": {
        key: '40026',
        value: ''
      },
      "onemHeight_middle": {
        key: '40027',
        value: ''
      },
      "onemHeight_bottom": {
        key: '40028',
        value: ''
      },
      "onemHeadLength": {
        key: '40038',
        value: ''
      },
      "onemComplexion_one": {
        key: '40044',
        value: ''
      },
      "onemComplexion_two": {
        key: '40045',
        value: ''
      },
      "onemComplexion_three": {
        key: '40046',
        value: ''
      },
      "onemSkinStr_one": {
        key: '40053',
        value: ''
      },
      "onemSkinStr_two": {
        key: '40054',
        value: ''
      },
      "bregExce_one": {
        key: '40063',
        value: ''
      },
      "bregExce_two": {
        key: '40064',
        value: ''
      },
      "bregExce_three": {
        key: '40065',
        value: ''
      },
      "bregExce_four": {
        key: '40066',
        value: ''
      },
      "neckMass_one": {
        key: '40077',
        value: ''
      },
      "neckMass_two": {
        key: '40078',
        value: ''
      },
      "eye_one": {
        key: '40083',
        value: ''
      },
      "eye_two": {
        key: '40084',
        value: ''
      },
      "ear_one": {
        key: '40091',
        value: ''
      },
      "ear_two": {
        key: '40092',
        value: ''
      },
      "mouth_one": {
        key: '40101',
        value: ''
      },
      "mouth_two": {
        key: '40102',
        value: ''
      },
      "chest_one": {
        key: '40107',
        value: ''
      },
      "chest_two": {
        key: '40108',
        value: ''
      },
      "abdomen_one": {
        key: '40115',
        value: ''
      },
      "abdomen_two": {
        key: '40116',
        value: ''
      },
      "umb_one": {
        key: '40125',
        value: ''
      },
      "umb_two": {
        key: '40126',
        value: ''
      },
      "limb_one": {
        key: '40129',
        value: ''
      },
      "limb_two": {
        key: '40130',
        value: ''
      },
      "ricketSym_one": {
        key: '40135',
        value: ''
      },
      "ricketSym_two": {
        key: '40136',
        value: ''
      },
      "ricketSym_three": {
        key: '40137',
        value: ''
      },
      "ricketSym_four": {
        key: '40138',
        value: ''
      },
      "ricketSign_one": {
        key: '40147',
        value: ''
      },
      "ricketSign_two": {
        key: '40148',
        value: ''
      },
      "anus_one": {
        key: '40165',
        value: ''
      },
      "anus_two": {
        key: '40166',
        value: ''
      },
      "onemOutdoorActivities": {
        key: '40174',
        value: ''
      },
      "onemVitamind": {
        key: '40178',
        value: ''
      },
      "motorDev_one": {
        key: '40183',
        value: ''
      },
      "motorDev_two": {
        key: '40184',
        value: ''
      },
      "periodIll_one": {
        key: '40198',
        value: ''
      },
      "periodIll_two": {
        key: '40199',
        value: ''
      },
      "periodIll_three": {
        key: '40200',
        value: ''
      },
      "periodIll_four": {
        key: '40201',
        value: ''
      },
      "periodIll_five": {
        key: '40202',
        value: ''
      },
      "periodIll_six": {
        key: '40203',
        value: ''
      },
      "periodIll_seven": {
        key: '40204',
        value: ''
      },
      "periodIll_eight": {
        key: '40205',
        value: ''
      },
      "periodIll_nine": {
        key: '40206',
        value: ''
      },
      "referral_one": {
        key: '40229',
        value: ''
      },
      "referral_two": {
        key: '40230',
        value: ''
      },
      "referral_three": {
        key: '40231',
        value: ''
      },
      "referral_four": {
        key: '40232',
        value: ''
      },
      "healthGuide_one": {
        key: '40248',
        value: ''
      },
      "healthGuide_two": {
        key: '40249',
        value: ''
      },
      "healthGuide_three": {
        key: '40250',
        value: ''
      },
      "healthGuide_four": {
        key: '40251',
        value: ''
      },
      "healthGuide_five": {
        key: '40252',
        value: ''
      },
      "healthGuide_six": {
        key: '40253',
        value: ''
      },
      "healthGuide_seven": {
        key: '40254',
        value: ''
      },
      "nextVisitDate": {
        key: '40270',
        value: ''
      },
      "onemVisitDoctor": {
        key: '40274',
        value: ''
      }
    };

    var june = {
      "createDate": {
        key: '40003',
        value: ''
      },
      "onemWeight": {
        key: '40013',
        value: ''
      },
      "onemWeight_top": {
        key: '40014',
        value: ''
      },
      "onemWeight_middle": {
        key: '40015',
        value: ''
      },
      "onemWeight_bottom": {
        key: '40016',
        value: ''
      },
      "onemHeight": {
        key: '40029',
        value: ''
      },
      "onemHeight_top": {
        key: '40030',
        value: ''
      },
      "onemHeight_middle": {
        key: '40031',
        value: ''
      },
      "onemHeight_bottom": {
        key: '40032',
        value: ''
      },
      "onemHeadLength": {
        key: '40039',
        value: ''
      },
      "onemComplexion_one": {
        key: '40047',
        value: ''
      },
      "onemComplexion_two": {
        key: '40048',
        value: ''
      },
      "onemSkinStr_one": {
        key: '40055',
        value: ''
      },
      "onemSkinStr_two": {
        key: '40056',
        value: ''
      },
      "bregExce_one": {
        key: '40067',
        value: ''
      },
      "bregExce_two": {
        key: '40068',
        value: ''
      },
      "bregExce_three": {
        key: '40069',
        value: ''
      },
      "bregExce_four": {
        key: '40070',
        value: ''
      },
      "neckMass_one": {
        key: '40079',
        value: ''
      },
      "neckMass_two": {
        key: '40080',
        value: ''
      },
      "eye_one": {
        key: '40085',
        value: ''
      },
      "eye_two": {
        key: '40086',
        value: ''
      },
      "ear_one": {
        key: '40093',
        value: ''
      },
      "ear_two": {
        key: '40094',
        value: ''
      },
      "listen_one": {
        key: '40097',
        value: ''
      },
      "listen_two": {
        key: '40098',
        value: ''
      },
      "onemTeeth": {
        key: '40103',
        value: ''
      },
      "chest_one": {
        key: '40109',
        value: ''
      },
      "chest_two": {
        key: '40110',
        value: ''
      },
      "abdomen_one": {
        key: '40117',
        value: ''
      },
      "abdomen_two": {
        key: '40118',
        value: ''
      },
      "limb_one": {
        key: '40131',
        value: ''
      },
      "limb_two": {
        key: '40132',
        value: ''
      },
      "ricketSym_one": {
        key: '40139',
        value: ''
      },
      "ricketSym_two": {
        key: '40140',
        value: ''
      },
      "ricketSym_three": {
        key: '40141',
        value: ''
      },
      "ricketSym_four": {
        key: '40142',
        value: ''
      },
      "ricketSign_one": {
        key: '40149',
        value: ''
      },
      "ricketSign_two": {
        key: '40150',
        value: ''
      },
      "ricketSign_three": {
        key: '40151',
        value: ''
      },
      "ricketSign_four": {
        key: '40152',
        value: ''
      },
      "ricketSign_five": {
        key: '40153',
        value: ''
      },
      "ricketSign_six": {
        key: '40154',
        value: ''
      },
      "ricketSign_seven": {
        key: '40155',
        value: ''
      },
      "anus_one": {
        key: '40167',
        value: ''
      },
      "anus_two": {
        key: '40168',
        value: ''
      },
      "onemHemoglobin": {
        key: '40171',
        value: ''
      },
      "onemOutdoorActivities": {
        key: '40175',
        value: ''
      },
      "onemVitamind": {
        key: '40179',
        value: ''
      },
      "motorDev_one": {
        key: '40185',
        value: ''
      },
      "motorDev_two": {
        key: '40186',
        value: ''
      },
      "periodIll_one": {
        key: '40207',
        value: ''
      },
      "periodIll_two": {
        key: '40208',
        value: ''
      },
      "periodIll_three": {
        key: '40209',
        value: ''
      },
      "periodIll_four": {
        key: '40210',
        value: ''
      },
      "periodIll_five": {
        key: '40211',
        value: ''
      },
      "periodIll_six": {
        key: '40212',
        value: ''
      },
      "periodIll_seven": {
        key: '40213',
        value: ''
      },
      "periodIll_eight": {
        key: '40214',
        value: ''
      },
      "periodIll_nine": {
        key: '40215',
        value: ''
      },
      "referral_one": {
        key: '40233',
        value: ''
      },
      "referral_two": {
        key: '40234',
        value: ''
      },
      "referral_three": {
        key: '40235',
        value: ''
      },
      "referral_four": {
        key: '40236',
        value: ''
      },
      "healthGuide_one": {
        key: '40255',
        value: ''
      },
      "healthGuide_two": {
        key: '40256',
        value: ''
      },
      "healthGuide_three": {
        key: '40257',
        value: ''
      },
      "healthGuide_four": {
        key: '40258',
        value: ''
      },
      "healthGuide_five": {
        key: '40259',
        value: ''
      },
      "healthGuide_six": {
        key: '40260',
        value: ''
      },
      "healthGuide_seven": {
        key: '40261',
        value: ''
      },
      "nextVisitDate": {
        key: '40271',
        value: ''
      },
      "onemVisitDoctor": {
        key: '40275',
        value: ''
      }
    };

    var august = {
      "createDate": {
        key: '40004',
        value: ''
      },
      "onemWeight": {
        key: '40017',
        value: ''
      },
      "onemWeight_top": {
        key: '40018',
        value: ''
      },
      "onemWeight_middle": {
        key: '40019',
        value: ''
      },
      "onemWeight_bottom": {
        key: '40020',
        value: ''
      },
      "onemHeight": {
        key: '40033',
        value: ''
      },
      "onemHeight_top": {
        key: '40034',
        value: ''
      },
      "onemHeight_middle": {
        key: '40035',
        value: ''
      },
      "onemHeight_bottom": {
        key: '40036',
        value: ''
      },
      "onemHeadLength": {
        key: '40040',
        value: ''
      },
      "onemComplexion_one": {
        key: '40049',
        value: ''
      },
      "onemComplexion_two": {
        key: '40050',
        value: ''
      },
      "onemSkinStr_one": {
        key: '40057',
        value: ''
      },
      "onemSkinStr_two": {
        key: '40058',
        value: ''
      },
      "bregExce_one": {
        key: '40071',
        value: ''
      },
      "bregExce_two": {
        key: '40072',
        value: ''
      },
      "bregExce_three": {
        key: '40073',
        value: ''
      },
      "bregExce_four": {
        key: '40074',
        value: ''
      },
      "eye_one": {
        key: '40087',
        value: ''
      },
      "eye_two": {
        key: '40088',
        value: ''
      },
      "ear_one": {
        key: '40095',
        value: ''
      },
      "ear_two": {
        key: '40096',
        value: ''
      },
      "onemTeeth": {
        key: '40104',
        value: ''
      },
      "chest_one": {
        key: '40111',
        value: ''
      },
      "chest_two": {
        key: '40112',
        value: ''
      },
      "abdomen_one": {
        key: '40119',
        value: ''
      },
      "abdomen_two": {
        key: '40120',
        value: ''
      },
      "limb_one": {
        key: '40133',
        value: ''
      },
      "limb_two": {
        key: '40134',
        value: ''
      },
      "ricketSym_one": {
        key: '40143',
        value: ''
      },
      "ricketSym_two": {
        key: '40144',
        value: ''
      },
      "ricketSym_three": {
        key: '40145',
        value: ''
      },
      "ricketSym_four": {
        key: '40146',
        value: ''
      },
      "ricketSign_one": {
        key: '40156',
        value: ''
      },
      "ricketSign_two": {
        key: '40157',
        value: ''
      },
      "ricketSign_three": {
        key: '40158',
        value: ''
      },
      "ricketSign_four": {
        key: '40159',
        value: ''
      },
      "ricketSign_five": {
        key: '40160',
        value: ''
      },
      "ricketSign_six": {
        key: '40161',
        value: ''
      },
      "ricketSign_seven": {
        key: '40162',
        value: ''
      },
      "anus_one": {
        key: '40169',
        value: ''
      },
      "anus_two": {
        key: '40170',
        value: ''
      },
      "onemHemoglobin": {
        key: '40172',
        value: ''
      },
      "onemOutdoorActivities": {
        key: '40176',
        value: ''
      },
      "onemVitamind": {
        key: '40180',
        value: ''
      },
      "motorDev_one": {
        key: '40187',
        value: ''
      },
      "motorDev_two": {
        key: '40188',
        value: ''
      },
      "periodIll_one": {
        key: '40216',
        value: ''
      },
      "periodIll_two": {
        key: '40217',
        value: ''
      },
      "periodIll_three": {
        key: '40218',
        value: ''
      },
      "periodIll_four": {
        key: '40219',
        value: ''
      },
      "periodIll_five": {
        key: '40220',
        value: ''
      },
      "periodIll_six": {
        key: '40221',
        value: ''
      },
      "periodIll_seven": {
        key: '40222',
        value: ''
      },
      "periodIll_eight": {
        key: '40223',
        value: ''
      },
      "periodIll_nine": {
        key: '40224',
        value: ''
      },
      "referral_one": {
        key: '40237',
        value: ''
      },
      "referral_two": {
        key: '40238',
        value: ''
      },
      "referral_three": {
        key: '40239',
        value: ''
      },
      "referral_four": {
        key: '40240',
        value: ''
      },
      "healthGuide_one": {
        key: '40262',
        value: ''
      },
      "healthGuide_two": {
        key: '40263',
        value: ''
      },
      "healthGuide_three": {
        key: '40264',
        value: ''
      },
      "healthGuide_four": {
        key: '40265',
        value: ''
      },
      "healthGuide_five": {
        key: '40266',
        value: ''
      },
      "healthGuide_six": {
        key: '40267',
        value: ''
      },
      "healthGuide_seven": {
        key: '40268',
        value: ''
      },
      "nextVisitDate": {
        key: '40272',
        value: ''
      },
      "onemVisitDoctor": {
        key: '40276',
        value: ''
      }
    };

    var december = {
      "createDate": {
        key: '41001',
        value: ''
      },
      "onemWeight": {
        key: '41005',
        value: ''
      },
      "onemWeight_top": {
        key: '41006',
        value: ''
      },
      "onemWeight_middle": {
        key: '41007',
        value: ''
      },
      "onemWeight_bottom": {
        key: '41008',
        value: ''
      },
      "onemHeight": {
        key: '41021',
        value: ''
      },
      "onemHeight_top": {
        key: '41022',
        value: ''
      },
      "onemHeight_middle": {
        key: '41023',
        value: ''
      },
      "onemHeight_bottom": {
        key: '41024',
        value: ''
      },
      "onemComplexion_one": {
        key: '41037',
        value: ''
      },
      "onemComplexion_two": {
        key: '41038',
        value: ''
      },
      "onemSkinStr_one": {
        key: '41045',
        value: ''
      },
      "onemSkinStr_two": {
        key: '41046',
        value: ''
      },
      "bregExce_one": {
        key: '41053',
        value: ''
      },
      "bregExce_two": {
        key: '41054',
        value: ''
      },
      "bregExce_three": {
        key: '41055',
        value: ''
      },
      "bregExce_four": {
        key: '41056',
        value: ''
      },
      "eye_one": {
        key: '41069',
        value: ''
      },
      "eye_two": {
        key: '41070',
        value: ''
      },
      "ear_one": {
        key: '41077',
        value: ''
      },
      "ear_two": {
        key: '41078',
        value: ''
      },
      "listen_one": {
        key: '41085',
        value: ''
      },
      "listen_two": {
        key: '41086',
        value: ''
      },
      "onemTeeth": {
        key: '41089',
        value: ''
      },
      "onemCaries": {
        key: '41090',
        value: ''
      },
      "chest_one": {
        key: '41097',
        value: ''
      },
      "chest_two": {
        key: '41098',
        value: ''
      },
      "abdomen_one": {
        key: '41105',
        value: ''
      },
      "abdomen_two": {
        key: '41106',
        value: ''
      },
      "limb_one": {
        key: '41113',
        value: ''
      },
      "limb_two": {
        key: '41114',
        value: ''
      },
      "ricketSym_one": {
        key: '41127',
        value: ''
      },
      "ricketSym_two": {
        key: '41128',
        value: ''
      },
      "ricketSym_three": {
        key: '41129',
        value: ''
      },
      "ricketSym_four": {
        key: '41130',
        value: ''
      },
      "ricketSym_five": {
        key: '41131',
        value: ''
      },
      "ricketSym_six": {
        key: '41132',
        value: ''
      },
      "ricketSym_seven": {
        key: '41133',
        value: ''
      },
      "onemOutdoorActivities": {
        key: '41150',
        value: ''
      },
      "onemVitamind": {
        key: '41154',
        value: ''
      },
      "motorDev_one": {
        key: '41158',
        value: ''
      },
      "motorDev_two": {
        key: '41159',
        value: ''
      },
      "periodIll_one": {
        key: '41166',
        value: ''
      },
      "periodIll_two": {
        key: '41167',
        value: ''
      },
      "periodIll_three": {
        key: '41168',
        value: ''
      },
      "periodIll_four": {
        key: '41169',
        value: ''
      },
      "periodIll_five": {
        key: '41170',
        value: ''
      },
      "periodIll_six": {
        key: '41171',
        value: ''
      },
      "periodIll_seven": {
        key: '41172',
        value: ''
      },
      "periodIll_eight": {
        key: '41173',
        value: ''
      },
      "periodIll_nine": {
        key: '41174',
        value: ''
      },
      "referral_one": {
        key: '41202',
        value: ''
      },
      "referral_two": {
        key: '41203',
        value: ''
      },
      "referral_three": {
        key: '41204',
        value: ''
      },
      "referral_four": {
        key: '41205',
        value: ''
      },
      "healthGuide_one": {
        key: '41218',
        value: ''
      },
      "healthGuide_two": {
        key: '41219',
        value: ''
      },
      "healthGuide_three": {
        key: '41220',
        value: ''
      },
      "healthGuide_four": {
        key: '41221',
        value: ''
      },
      "healthGuide_five": {
        key: '41222',
        value: ''
      },
      "healthGuide_six": {
        key: '41223',
        value: ''
      },
      "healthGuide_seven": {
        key: '41224',
        value: ''
      },
      "nextVisitDate": {
        key: '41246',
        value: ''
      },
      "onemVisitDoctor": {
        key: '41250',
        value: ''
      }
    };

    var eighteen = {
      "createDate": {
        key: '41002',
        value: ''
      },
      "onemWeight": {
        key: '41009',
        value: ''
      },
      "onemWeight_top": {
        key: '41010',
        value: ''
      },
      "onemWeight_middle": {
        key: '41011',
        value: ''
      },
      "onemWeight_bottom": {
        key: '41012',
        value: ''
      },
      "onemHeight": {
        key: '41025',
        value: ''
      },
      "onemHeight_top": {
        key: '41026',
        value: ''
      },
      "onemHeight_middle": {
        key: '41027',
        value: ''
      },
      "onemHeight_bottom": {
        key: '41028',
        value: ''
      },
      "onemComplexion_one": {
        key: '41039',
        value: ''
      },
      "onemComplexion_two": {
        key: '41040',
        value: ''
      },
      "onemSkinStr_one": {
        key: '41047',
        value: ''
      },
      "onemSkinStr_two": {
        key: '41048',
        value: ''
      },
      "bregExce_one": {
        key: '41057',
        value: ''
      },
      "bregExce_two": {
        key: '41058',
        value: ''
      },
      "bregExce_three": {
        key: '41059',
        value: ''
      },
      "bregExce_four": {
        key: '41060',
        value: ''
      },
      "eye_one": {
        key: '41071',
        value: ''
      },
      "eye_two": {
        key: '41072',
        value: ''
      },
      "ear_one": {
        key: '41079',
        value: ''
      },
      "ear_two": {
        key: '41080',
        value: ''
      },
      "onemTeeth": {
        key: '41091',
        value: ''
      },
      "onemCaries": {
        key: '41092',
        value: ''
      },
      "chest_one": {
        key: '41099',
        value: ''
      },
      "chest_two": {
        key: '41100',
        value: ''
      },
      "abdomen_one": {
        key: '41107',
        value: ''
      },
      "abdomen_two": {
        key: '41108',
        value: ''
      },
      "limb_one": {
        key: '41115',
        value: ''
      },
      "limb_two": {
        key: '41116',
        value: ''
      },
      "gait_one": {
        key: '41121',
        value: ''
      },
      "gait_two": {
        key: '41122',
        value: ''
      },
      "ricketSym_one": {
        key: '41134',
        value: ''
      },
      "ricketSym_two": {
        key: '41135',
        value: ''
      },
      "ricketSym_three": {
        key: '41136',
        value: ''
      },
      "ricketSym_four": {
        key: '41137',
        value: ''
      },
      "ricketSym_five": {
        key: '41138',
        value: ''
      },
      "ricketSym_six": {
        key: '41139',
        value: ''
      },
      "ricketSym_seven": {
        key: '41140',
        value: ''
      },
      "onemHemoglobin": {
        key: '41148',
        value: ''
      },
      "onemOutdoorActivities": {
        key: '41151',
        value: ''
      },
      "onemVitamind": {
        key: '41155',
        value: ''
      },
      "motorDev_one": {
        key: '41160',
        value: ''
      },
      "motorDev_two": {
        key: '41161',
        value: ''
      },
      "periodIll_one": {
        key: '41175',
        value: ''
      },
      "periodIll_two": {
        key: '41176',
        value: ''
      },
      "periodIll_three": {
        key: '41177',
        value: ''
      },
      "periodIll_four": {
        key: '41178',
        value: ''
      },
      "periodIll_five": {
        key: '41179',
        value: ''
      },
      "periodIll_six": {
        key: '41180',
        value: ''
      },
      "periodIll_seven": {
        key: '41181',
        value: ''
      },
      "periodIll_eight": {
        key: '41182',
        value: ''
      },
      "periodIll_nine": {
        key: '41183',
        value: ''
      },
      "referral_one": {
        key: '41206',
        value: ''
      },
      "referral_two": {
        key: '41207',
        value: ''
      },
      "referral_three": {
        key: '41208',
        value: ''
      },
      "referral_four": {
        key: '41209',
        value: ''
      },
      "healthGuide_one": {
        key: '41225',
        value: ''
      },
      "healthGuide_two": {
        key: '41226',
        value: ''
      },
      "healthGuide_three": {
        key: '41227',
        value: ''
      },
      "healthGuide_four": {
        key: '41228',
        value: ''
      },
      "healthGuide_five": {
        key: '41229',
        value: ''
      },
      "healthGuide_six": {
        key: '41230',
        value: ''
      },
      "healthGuide_seven": {
        key: '41231',
        value: ''
      },
      "nextVisitDate": {
        key: '41247',
        value: ''
      },
      "onemVisitDoctor": {
        key: '41251',
        value: ''
      }
    };

    var twentyfour = {
      "createDate": {
        key: '41003',
        value: ''
      },
      "onemWeight": {
        key: '41013',
        value: ''
      },
      "onemWeight_top": {
        key: '41014',
        value: ''
      },
      "onemWeight_middle": {
        key: '41015',
        value: ''
      },
      "onemWeight_bottom": {
        key: '41016',
        value: ''
      },
      "onemHeight": {
        key: '41029',
        value: ''
      },
      "onemHeight_top": {
        key: '41030',
        value: ''
      },
      "onemHeight_middle": {
        key: '41031',
        value: ''
      },
      "onemHeight_bottom": {
        key: '41032',
        value: ''
      },
      "onemComplexion_one": {
        key: '41041',
        value: ''
      },
      "onemComplexion_two": {
        key: '41042',
        value: ''
      },
      "onemSkinStr_one": {
        key: '41049',
        value: ''
      },
      "onemSkinStr_two": {
        key: '41050',
        value: ''
      },
      "bregExce_one": {
        key: '41061',
        value: ''
      },
      "bregExce_two": {
        key: '41062',
        value: ''
      },
      "bregExce_three": {
        key: '41063',
        value: ''
      },
      "bregExce_four": {
        key: '41064',
        value: ''
      },
      "eye_one": {
        key: '41073',
        value: ''
      },
      "eye_two": {
        key: '41074',
        value: ''
      },
      "ear_one": {
        key: '41081',
        value: ''
      },
      "ear_two": {
        key: '41082',
        value: ''
      },
      "listen_one": {
        key: '41087',
        value: ''
      },
      "listen_two": {
        key: '41088',
        value: ''
      },
      "onemTeeth": {
        key: '41093',
        value: ''
      },
      "onemCaries": {
        key: '41094',
        value: ''
      },
      "chest_one": {
        key: '41101',
        value: ''
      },
      "chest_two": {
        key: '41102',
        value: ''
      },
      "abdomen_one": {
        key: '41109',
        value: ''
      },
      "abdomen_two": {
        key: '41110',
        value: ''
      },
      "limb_one": {
        key: '41117',
        value: ''
      },
      "limb_two": {
        key: '41118',
        value: ''
      },
      "gait_one": {
        key: '41123',
        value: ''
      },
      "gait_two": {
        key: '41124',
        value: ''
      },
      "ricketSym_one": {
        key: '41141',
        value: ''
      },
      "ricketSym_two": {
        key: '41142',
        value: ''
      },
      "ricketSym_three": {
        key: '41143',
        value: ''
      },
      "ricketSym_four": {
        key: '41144',
        value: ''
      },
      "ricketSym_five": {
        key: '41145',
        value: ''
      },
      "ricketSym_six": {
        key: '41146',
        value: ''
      },
      "ricketSym_seven": {
        key: '41147',
        value: ''
      },
      "onemOutdoorActivities": {
        key: '41152',
        value: ''
      },
      "onemVitamind": {
        key: '41156',
        value: ''
      },
      "motorDev_one": {
        key: '41162',
        value: ''
      },
      "motorDev_two": {
        key: '41163',
        value: ''
      },
      "periodIll_one": {
        key: '41184',
        value: ''
      },
      "periodIll_two": {
        key: '41185',
        value: ''
      },
      "periodIll_three": {
        key: '41186',
        value: ''
      },
      "periodIll_four": {
        key: '41187',
        value: ''
      },
      "periodIll_five": {
        key: '41188',
        value: ''
      },
      "periodIll_six": {
        key: '41189',
        value: ''
      },
      "periodIll_seven": {
        key: '41190',
        value: ''
      },
      "periodIll_eight": {
        key: '41191',
        value: ''
      },
      "periodIll_nine": {
        key: '41192',
        value: ''
      },
      "referral_one": {
        key: '41210',
        value: ''
      },
      "referral_two": {
        key: '41211',
        value: ''
      },
      "referral_three": {
        key: '41212',
        value: ''
      },
      "referral_four": {
        key: '41213',
        value: ''
      },
      "healthGuide_one": {
        key: '41232',
        value: ''
      },
      "healthGuide_two": {
        key: '41233',
        value: ''
      },
      "healthGuide_three": {
        key: '41234',
        value: ''
      },
      "healthGuide_four": {
        key: '41235',
        value: ''
      },
      "healthGuide_five": {
        key: '41236',
        value: ''
      },
      "healthGuide_six": {
        key: '41237',
        value: ''
      },
      "healthGuide_seven": {
        key: '41238',
        value: ''
      },
      "nextVisitDate": {
        key: '41248',
        value: ''
      },
      "onemVisitDoctor": {
        key: '41252',
        value: ''
      }
    };

    var thirty = {
      "createDate": {
        key: '41004',
        value: ''
      },
      "onemWeight": {
        key: '41017',
        value: ''
      },
      "onemWeight_top": {
        key: '41018',
        value: ''
      },
      "onemWeight_middle": {
        key: '41019',
        value: ''
      },
      "onemWeight_bottom": {
        key: '41020',
        value: ''
      },
      "onemHeight": {
        key: '41033',
        value: ''
      },
      "onemHeight_top": {
        key: '41034',
        value: ''
      },
      "onemHeight_middle": {
        key: '41035',
        value: ''
      },
      "onemHeight_bottom": {
        key: '41036',
        value: ''
      },
      "onemComplexion_one": {
        key: '41043',
        value: ''
      },
      "onemComplexion_two": {
        key: '41044',
        value: ''
      },
      "onemSkinStr_one": {
        key: '41051',
        value: ''
      },
      "onemSkinStr_two": {
        key: '41052',
        value: ''
      },
      "bregExce_one": {
        key: '41065',
        value: ''
      },
      "bregExce_two": {
        key: '41066',
        value: ''
      },
      "bregExce_three": {
        key: '41067',
        value: ''
      },
      "bregExce_four": {
        key: '41068',
        value: ''
      },
      "eye_one": {
        key: '41075',
        value: ''
      },
      "eye_two": {
        key: '41076',
        value: ''
      },
      "ear_one": {
        key: '41083',
        value: ''
      },
      "ear_two": {
        key: '41084',
        value: ''
      },
      "onemTeeth": {
        key: '41095',
        value: ''
      },
      "onemCaries": {
        key: '41096',
        value: ''
      },
      "chest_one": {
        key: '41103',
        value: ''
      },
      "chest_two": {
        key: '41104',
        value: ''
      },
      "abdomen_one": {
        key: '41111',
        value: ''
      },
      "abdomen_two": {
        key: '41112',
        value: ''
      },
      "limb_one": {
        key: '41119',
        value: ''
      },
      "limb_two": {
        key: '41120',
        value: ''
      },
      "gait_one": {
        key: '41125',
        value: ''
      },
      "gait_two": {
        key: '41126',
        value: ''
      },
      "onemHemoglobin": {
        key: '41149',
        value: ''
      },
      "onemOutdoorActivities": {
        key: '41153',
        value: ''
      },
      "onemVitamind": {
        key: '41157',
        value: ''
      },
      "motorDev_one": {
        key: '41164',
        value: ''
      },
      "motorDev_two": {
        key: '41165',
        value: ''
      },
      "periodIll_one": {
        key: '41193',
        value: ''
      },
      "periodIll_two": {
        key: '41194',
        value: ''
      },
      "periodIll_three": {
        key: '41195',
        value: ''
      },
      "periodIll_four": {
        key: '41196',
        value: ''
      },
      "periodIll_five": {
        key: '41197',
        value: ''
      },
      "periodIll_six": {
        key: '41198',
        value: ''
      },
      "periodIll_seven": {
        key: '41199',
        value: ''
      },
      "periodIll_eight": {
        key: '41200',
        value: ''
      },
      "periodIll_nine": {
        key: '41201',
        value: ''
      },
      "referral_one": {
        key: '41214',
        value: ''
      },
      "referral_two": {
        key: '41215',
        value: ''
      },
      "referral_three": {
        key: '41216',
        value: ''
      },
      "referral_four": {
        key: '41217',
        value: ''
      },
      "healthGuide_one": {
        key: '41239',
        value: ''
      },
      "healthGuide_two": {
        key: '41240',
        value: ''
      },
      "healthGuide_three": {
        key: '41241',
        value: ''
      },
      "healthGuide_four": {
        key: '41242',
        value: ''
      },
      "healthGuide_five": {
        key: '41243',
        value: ''
      },
      "healthGuide_six": {
        key: '41244',
        value: ''
      },
      "healthGuide_seven": {
        key: '41245',
        value: ''
      },
      "nextVisitDate": {
        key: '41249',
        value: ''
      },
      "onemVisitDoctor": {
        key: '41253',
        value: ''
      }
    };

    var temp = {};
    switch (data.onemMonth) {
      case 1:
        temp = january;
        break;
      case 2:
        temp = march;
        break;
      case 3:
        temp = june;
        break;
      case 4:
        temp = august;
        break;
      case 5:
        temp = december;
        break;
      case 6:
        temp = eighteen;
        break;
      case 7:
        temp = twentyfour;
        break;
      case 8:
        temp = thirty;
        break;
    }

    temp.createDate.value = common.Util.formatDate(data.createDate, '-');
    temp.onemWeight.value = data.onemWeight;
    temp.onemWeight_top.value = function() {
      if (data.onemWeightLevel == 1)
        return '√';
      return ' ';
    };
    temp.onemWeight_middle.value = function() {
      if (data.onemWeightLevel == 2)
        return '√';
      return ' ';
    };
    temp.onemWeight_bottom.value = function() {
      if (data.onemWeightLevel == 3)
        return '√';
      return ' ';
    };
    temp.onemHeight.value = data.onemHeight;
    temp.onemHeight_top.value = function() {
      if (data.onemHeightLevel == 1)
        return '√';
      return ' ';
    };
    temp.onemHeight_middle.value = function() {
      if (data.onemHeightLevel == 2)
        return '√';
      return ' ';
    };
    temp.onemHeight_bottom.value = function() {
      if (data.onemHeightLevel == 3)
        return '√';
      return ' ';
    };
    if (data.onemMonth == 1 || data.onemMonth == 2 || data.onemMonth == 3 || data.onemMonth == 4) {
      temp.onemHeadLength.value = data.onemHeadLength;
    }
    if (data.onemMonth == 1 || data.onemMonth == 2) {
      temp.onemComplexion_one.value = function() {
        if (data.onemComplexion == 2)
          return '√';
        return ' ';
      };
      temp.onemComplexion_two.value = function() {
        if (data.onemComplexion == 3)
          return '√';
        return ' ';
      };
      temp.onemComplexion_three.value = function() {
        if (data.onemComplexion == 1)
          return '√';
        return ' ';
      };
    } else {
      temp.onemComplexion_one.value = function() {
        if (data.onemComplexion == 2)
          return '√';
        return ' ';
      };
      temp.onemComplexion_two.value = function() {
        if (data.onemComplexion !== 2)
          return '√';
        return ' ';
      };
    }

    temp.onemSkinStr_one.value = function() {
      if (data.onemSkin == 2)
        return '√';
      return ' ';
    };
    temp.onemSkinStr_two.value = function() {
      if (data.onemSkin == 1)
        return '√';
      return ' ';
    };
    temp.bregExce_one.value = function() {
      if (data.onemBregmaticExce == 1)
        return '√';
      return ' ';
    };
    temp.bregExce_two.value = function() {
      if (data.onemBregmaticExce == 2)
        return '√';
      return ' ';
    };
    temp.bregExce_three.value = data.onemBregmatic1;
    temp.bregExce_four.value = data.onemBregmatic2;
    if (data.onemMonth == 1 || data.onemMonth == 2 || data.onemMonth == 3) {
      temp.neckMass_one.value = function() {
        if (data.onemNeckMass == 1)
          return '√';
        return ' ';
      };
      temp.neckMass_two.value = function() {
        if (data.onemNeckMass == 2)
          return '√';
        return ' ';
      };
    }
    temp.eye_one.value = function() {
      if (data.onemEye == 2)
        return '√';
      return ' ';
    };
    temp.eye_two.value = function() {
      if (data.onemEye == 1)
        return '√';
      return ' ';
    };
    temp.ear_one.value = function() {
      if (data.onemEar == 2)
        return '√';
      return ' ';
    };
    temp.ear_two.value = function() {
      if (data.onemEar == 1)
        return '√';
      return ' ';
    };
    if (data.onemMonth == 3 || data.onemMonth == 5 || data.onemMonth == 7) {
      temp.listen_one.value = function() {
        if (data.onemListen == 2)
          return '√';
        return ' ';
      };
      temp.listen_two.value = function() {
        if (data.onemListen == 1)
          return '√';
        return ' ';
      };
    }
    if (data.onemMonth == 5 || data.onemMonth == 6 || data.onemMonth == 7 || data.onemMonth == 8) {
      temp.onemTeeth.value = data.onemTeeth;
      temp.onemCaries.value = data.onemCaries;
    } else if (data.onemMonth == 1 || data.onemMonth == 2) {
      temp.mouth_one.value = function() {
        if (data.onemMouth == 2)
          return '√';
        return ' ';
      };
      temp.mouth_two.value = function() {
        if (data.onemMouth == 1)
          return '√';
        return ' ';
      };
    } else if (data.onemMonth == 3 || data.onemMonth == 4) {
      temp.onemTeeth.value = data.onemTeeth;
    }

    temp.chest_one.value = function() {
      if (data.onemChest == 2)
        return '√';
      return ' ';
    };
    temp.chest_two.value = function() {
      if (data.onemChest == 1)
        return '√';
      return ' ';
    };
    temp.abdomen_one.value = function() {
      if (data.onemAbdomen == 2)
        return '√';
      return ' ';
    };
    temp.abdomen_two.value = function() {
      if (data.onemAbdomen == 1)
        return '√';
      return ' ';
    };
    if (data.onemMonth == 1) {
      temp.umb_one.value = function() {
        if (data.onemUmbilicalCord == 1)
          return '√';
        return ' ';
      };
      temp.umb_two.value = function() {
        if (data.onemUmbilicalCord == 2)
          return '√';
        return ' ';
      };
      temp.umb_three.value = function() {
        if (data.onemUmbilicalCord == 3)
          return '√';
        return ' ';
      };
      temp.umb_four.value = function() {
        if (data.onemUmbilicalCord == 4)
          return '√';
        return ' ';
      };
    } else if (data.onemMonth == 2) {
      temp.umb_one.value = function() {
        if (data.onemUmbilicalCord == 2)
          return '√';
        return ' ';
      };
      temp.umb_two.value = function() {
        if (data.onemUmbilicalCord == 1)
          return '√';
        return ' ';
      };
    }
    temp.limb_one.value = function() {
      if (data.onemLimb == 2)
        return '√';
      return ' ';
    };
    temp.limb_two.value = function() {
      if (data.onemLimb == 1)
        return '√';
      return ' ';
    };
    if (data.onemMonth == 6 || data.onemMonth == 7 || data.onemMonth == 8) {
      temp.gait_one.value = function() {
        if (data.onemGait == 2)
          return '√';
        return ' ';
      };
      temp.gait_two.value = function() {
        if (data.onemGait == 1)
          return '√';
        return ' ';
      };
    }
    if (data.onemMonth == 2 || data.onemMonth == 3 || data.onemMonth == 4) {
      temp.ricketSym_one.value = function() {
        if (data.onemRicketsSymtom == 1)
          return '√';
        return ' ';
      };
      temp.ricketSym_two.value = function() {
        if (data.onemRicketsSymtom == 2)
          return '√';
        return ' ';
      };
      temp.ricketSym_three.value = function() {
        if (data.onemRicketsSymtom == 3)
          return '√';
        return ' ';
      };
      temp.ricketSym_four.value = function() {
        if (data.onemRicketsSymtom == 4)
          return '√';
        return ' ';
      };
    }
    if (data.onemMonth == 5 || data.onemMonth == 6 || data.onemMonth == 7) {
      temp.ricketSym_one.value = function() {
        if (data.onemRicketsSign == 1)
          return '√';
        return ' ';
      };
      temp.ricketSym_two.value = function() {
        if (data.onemRicketsSign == 2)
          return '√';
        return ' ';
      };
      temp.ricketSym_three.value = function() {
        if (data.onemRicketsSign == 3)
          return '√';
        return ' ';
      };
      temp.ricketSym_four.value = function() {
        if (data.onemRicketsSign == 4)
          return '√';
        return ' ';
      };
      temp.ricketSym_five.value = function() {
        if (data.onemRicketsSign == 5)
          return '√';
        return ' ';
      };
      temp.ricketSym_six.value = function() {
        if (data.onemRicketsSign == 6)
          return '√';
        return ' ';
      };
      temp.ricketSym_seven.value = function() {
        if (data.onemRicketsSign == 7)
          return '√';
        return ' ';
      };
    } else if (data.onemMonth == 3 || data.onemMonth == 4) {
      temp.ricketSign_one.value = function() {
        if (data.onemRicketsSign == 1)
          return '√';
        return ' ';
      };
      temp.ricketSign_two.value = function() {
        if (data.onemRicketsSign == 2)
          return '√';
        return ' ';
      };
      temp.ricketSign_three.value = function() {
        if (data.onemRicketsSign == 3)
          return '√';
        return ' ';
      };
      temp.ricketSign_four.value = function() {
        if (data.onemRicketsSign == 4)
          return '√';
        return ' ';
      };
      temp.ricketSign_five.value = function() {
        if (data.onemRicketsSign == 5)
          return '√';
        return ' ';
      };
      temp.ricketSign_six.value = function() {
        if (data.onemRicketsSign == 6)
          return '√';
        return ' ';
      };
      temp.ricketSign_seven.value = function() {
        if (data.onemRicketsSign == 7)
          return '√';
        return ' ';
      };
    } else if (data.onemMonth == 2) {
      temp.ricketSign_one.value = function() {
        if (data.onemRicketsSign == 1)
          return '√';
        return ' ';
      };
      temp.ricketSign_two.value = function() {
        if (data.onemRicketsSign == 2)
          return '√';
        return ' ';
      };
    }
    if (data.onemMonth == 1 || data.onemMonth == 2 || data.onemMonth == 3 || data.onemMonth == 4) {
      temp.anus_one.value = function(){
        if(data.onemAnus == 2)
            return '√';
        return ' ';
      }
      temp.anus_two.value = function(){
        if(data.onemAnus == 1)
            return '√';
        return ' ';
      }
    }

    if (data.onemMonth == 3 || data.onemMonth == 4 || data.onemMonth == 6 || data.onemMonth == 8) {
      temp.onemHemoglobin.value = data.onemHemoglobin;
    }
    temp.onemOutdoorActivities.value = data.onemOutdoorActivities;
    temp.onemVitamind.value = data.onemVitamind;
    temp.motorDev_one.value = function() {
      if (data.onemMotorDevelopment == 2)
        return '√';
      return ' ';
    };
    temp.motorDev_two.value = function() {
      if (data.onemMotorDevelopment == 1)
        return '√';
      return ' ';
    };
    temp.periodIll_one.value = function() {
      if (data.onemPeriodIll == 2)
        return '√';
      return ' ';
    };
    temp.periodIll_two.value = ' ';
    temp.periodIll_three.value = data.onemPeriodPneumonia;
    temp.periodIll_four.value = ' ';
    temp.periodIll_five.value = data.onemPeriodDiarrhea;
    temp.periodIll_six.value = ' ';
    temp.periodIll_seven.value = data.onemPeriodTrauma;
    temp.periodIll_eight.value = ' ';
    temp.periodIll_nine.value = data.onemPeriodOther;
    temp.referral_one.value = function() {
      if (data.onemReferralFlag == 2)
        return '√';
      return ' ';
    };
    temp.referral_two.value = function() {
      if (data.onemReferralFlag == 1)
        return '√';
      return ' ';
    };
    temp.referral_three.value = data.onemReferralReason;
    temp.referral_four.value = data.onemReferralHospital;
    temp.healthGuide_one.value = function() {
      if (data.healthGuide.guidNeonatalCare == 1)
        return '√';
      return ' ';
    };
    temp.healthGuide_two.value = function() {
      if (data.healthGuide.guidAxue == 1)
        return '√';
      return ' ';
    };
    temp.healthGuide_three.value = function() {
      if (data.healthGuide.guidPrevention == 1)
        return '√';
      return ' ';
    };
    temp.healthGuide_four.value = function() {
      if (data.healthGuide.guidWound == 1)
        return '√';
      return ' ';
    };
    temp.healthGuide_five.value = function() {
      if (data.healthGuide.guidMouth == 1)
        return '√';
      return ' ';
    };
    temp.healthGuide_six.value = function() {
      if (data.healthGuide.guidOther)
        return '√';
      return ' ';
    };
    temp.healthGuide_seven.value = data.healthGuide.guidOther;

    temp.nextVisitDate.value = common.Util.formatDate(data.nextVisitDate);
    temp.onemVisitDoctor.value = data.onemVisitDoctor;

    if (data.onemMonth == 1 || data.onemMonth == 2 || data.onemMonth == 3 || data.onemMonth == 4) {
      var arr_january = _.values(january);
      var arr_march = _.values(march);
      var arr_june = _.values(june);
      var arr_august = _.values(august);
      var arr = [].concat(arr_january, arr_march, arr_june, arr_august);
      arr.push({key: '40000', value: data.residentName});
      return _.sortByOrder(arr, ['key'], ['asc']);
    }
    if (data.onemMonth == 5 || data.onemMonth == 6 || data.onemMonth == 7 || data.onemMonth == 8) {
      var arr_december = _.values(december);
      var arr_eighteen = _.values(eighteen);
      var arr_twentyfour = _.values(twentyfour);
      var arr_thirty = _.values(thirty);
      var arr = [].concat(arr_december, arr_eighteen, arr_twentyfour, arr_thirty);
      arr.push({key: '41000', value: data.residentName});
      return _.sortByOrder(arr, ['key'], ['asc']);
    }

  }

  var formTemplate = {};

  formTemplate.getFormData = function(data) {
    var arr = childHealthCheckRecordsTwo(data);
    return arr;
  };
  return formTemplate;
}));
