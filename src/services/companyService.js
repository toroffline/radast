import CommonUtil from '../utils/commonUtil';

class CompanyService {
    #companyList;

    constructor(companyList) {
        this.#companyList = this.regenerateCompanyList(companyList);
    }

    regenerateCompanyList(companyListRaw) {
        return companyListRaw
            ? companyListRaw.map((company, index) => ({
                  id: company.id || index,
                  aliasName: company.N_name,
                  keywordDisplay: company.N_shortname
                      ? company.N_shortname.split(' ').join(', ')
                      : undefined,
                  marketCap: company.marketcap,
                  marketCapDisplay: company.marketcap
                      ? company.marketcap.toLocaleString()
                      : undefined,
                  name: {
                      th: company.N_COMPANY_T,
                      en: company.N_COMPANY_E,
                  },
                  url: company.N_URL,
                  fType: company.F_TYPE,
                  businessType: {
                      th: company.N_BUSINESS_TYPE_T,
                      en: company.N_BUSINESS_TYPE_E,
                  },
                  fullName: company.N_fullname,
              }))
            : [];
    }

    async sort(sortField, sortDirection) {
        // Mock API

        this.#companyList = this.#companyList.sort((a, b) => {
            let aValue;
            let bValue;
            if (sortField === 'companyName') {
                aValue = a.aliasName;
                bValue = b.aliasName;
                if (sortDirection === 'asc') {
                    return aValue > bValue ? -1 : aValue === bValue ? 0 : 1;
                }

                return aValue < bValue ? -1 : aValue === bValue ? 0 : 1;
            }

            aValue = a.marketCap;
            bValue = b.marketCap;

            if (bValue == null) return -1;
            if (aValue == null) return 1;

            return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
        });

        await CommonUtil.sleep(1000);

        return [...this.#companyList];
    }

    async getList() {
        // Mock API
        await CommonUtil.sleep(1000);
        return this.#companyList;
    }

    async getDetail(companyId) {
        // Mock API
        await CommonUtil.sleep(1000);

        return this.#companyList.find((company) => company.id === companyId);
    }
}

const mockCompanyList = [
    {
        N_name: 'A',
        N_shortname: 'เอ',
        marketcap: 4949000000,
        N_COMPANY_T: 'บริษัท อารียา พรอพเพอร์ตี้ จำกัด (มหาชน)',
        N_COMPANY_E: 'AREEYA PROPERTY PUBLIC COMPANY LIMITED',
        N_URL: 'http://www.areeya.co.th',
        F_TYPE: 'S',
        N_BUSINESS_TYPE_E:
            'The Company engages in the development of property business. It offers three types of products: 1) single-detached houses; sells land and then constructs house on the said land or sells land with completely built house, 2) townhouse and 3) condominium projects.The company has initiated to develop the community mall named Pickadaily Bangkok.',
        N_BUSINESS_TYPE_T:
            'ธุรกิจอสังหาริมทรัพย์ แบ่งเป็น 3 ประเภท 1) โครงการบ้านเดี่ยว โดยจะขายที่ดินเปล่าซึ่งเป็นกรรมสิทธิ์ของบริษัท และรับจ้างปลูกสร้างบ้านบนที่ดินนั้น หรือขายที่ดินพร้อมบ้านสร้างเสร็จ 2) โครงการทาวน์เฮาส์ และ 3) โครงการคอนโดมิเนียม โดยเน้นทำเลใจกลางเมืองบริษัทมีการพัฒนาโครงการประเภทธุรกิจศูนย์การค้าหรือคอมมิวนิตี้มอลล์ ในชื่อว่า Pickadaily Bangkok',
        N_fullname: 'AREEYA PROPERTY PUBLIC COMPANY LIMITED',
    },
    {
        N_name: 'DOD',
        N_shortname: null,
        marketcap: 2070502495,
        N_COMPANY_T: 'บริษัท ดีโอดี ไบโอเทค จำกัด (มหาชน)',
        N_COMPANY_E: 'DOD BIOTECH PUBLIC COMPANY LIMITED',
        N_URL: 'www.dodbiotech.com',
        F_TYPE: 'S',
        N_BUSINESS_TYPE_E:
            'DOD operates as a manufacturer of dietary supplement products under and customers\' brand and its brand "Dai a to"',
        N_BUSINESS_TYPE_T:
            'บริษัทดำเนินธุรกิจรับจ้างผลิตผลิตภัณฑ์เสริมอาหารภายใต้ตราสินค้าของลูกค้า และตราสินค้าของบริษัท "Dai a to" (ได เอโตะ)',
        N_fullname: 'DOD BIOTECH PUBLIC COMPANY LIMITED',
    },
    {
        N_name: 'NETBAY',
        N_shortname: 'เน็ทเบ NET NE NETB',
        marketcap: 5450000000,
        N_COMPANY_T: 'บริษัท เน็ตเบย์ จำกัด (มหาชน)',
        N_COMPANY_E: 'NETBAY PUBLIC COMPANY LIMITED',
        N_URL: 'http://www.netbay.co.th',
        F_TYPE: 'S',
        N_BUSINESS_TYPE_E:
            'The Company is primarily engaged in the invention, creation and development of various Digital Business Technology Platforms for Digital Business Service transactions and provides comprehensive Software as a Service (SaaS) for Business-to-Government (B2G), Business-to-Business (B2B) and Business-to-Consumer (B2C) Groups.',
        N_BUSINESS_TYPE_T:
            'บริษัทประกอบธุรกิจหลักเป็นผู้คิดค้น สร้างสรรค์ และพัฒนา Digital Business Technology Platform ในการทำธุรกรรมทางอิเล็กทรอนิกส์ (Digital Business Services) และนำเสนอผลิตภัณฑ์นั้นแก่ผู้ใช้ในรูปแบบการให้บริการ (SaaS: Software as a Service) อย่างครบวงจรระหว่างภาคธุรกิจและภาครัฐ (B2G) ระหว่างภาคธุรกิจและภาคธุรกิจ (B2B) และระหว่างภาคเอกชนและประชาชนหรือผู้บริโภค (B2C)',
        N_fullname: 'NETBAY PUBLIC COMPANY LIMITED',
    },
    {
        N_name: 'PMTA',
        N_shortname: 'PM THORESEN ASIA HOLDINGS พีเอ็มทีเอ PMT PM',
        marketcap: 1082840000,
        N_COMPANY_T: 'บริษัท พีเอ็ม โทรีเซน เอเชีย โฮลดิ้งส์ จำกัด (มหาชน)',
        N_COMPANY_E: 'PM THORESEN ASIA HOLDINGS PUBLIC COMPANY LIMITED',
        N_URL: 'http://www.pmthoresenasia.com',
        F_TYPE: 'S',
        N_BUSINESS_TYPE_E:
            'PMTA is a holding company which has Baconco Company Limited, a company in Vietnam, as a core company. Baconco Company Limited is engaged in developing, producing, marketing, selling and distributing agrochemical products.',
        N_BUSINESS_TYPE_T:
            'ประกอบธุรกิจหลักโดยการถือหุ้นในบริษัทอื่น (Holding Company) โดยมี Baconco Company Limited ในประเทศเวียดนามเป็นบริษัทแกน ซึ่ง Baconco ประกอบธุรกิจหลักในการพัฒนา ผลิต ดำเนินกิจกรรมทางการตลาด ขายและจัดจำหน่ายผลิตภัณฑ์เคมีเพื่อการเกษตร',
        N_fullname: 'PM THORESEN ASIA HOLDINGS PUBLIC COMPANY',
    },
    {
        N_name: 'SOLAR',
        N_shortname: 'โซลาร์ SOL SO SOLA',
        marketcap: 1273251875,
        N_COMPANY_T: 'บริษัท โซลาร์ตรอน จำกัด (มหาชน)',
        N_COMPANY_E: 'SOLARTRON PUBLIC COMPANY LIMITED',
        N_URL: 'http://www.solartron.co.th',
        F_TYPE: 'S',
        N_BUSINESS_TYPE_E:
            'The company provides a wide range of solar modules and a balance of systems for solar electricity application. It also provides nationwide installation services including export.',
        N_BUSINESS_TYPE_T:
            'ผลิตและจำหน่ายแผงเซลล์แสงอาทิตย์แบบต่าง ๆ และให้บริการออกแบบและติดตั้งระบบผลิตไฟฟ้าด้วยเซลล์แสงอาทิตย์ทุกรูปแบบ ทั้งในและต่างประเทศ',
        N_fullname: 'SOLARTRON PUBLIC COMPANY LIMITED',
    },
    {
        N_name: 'ARIN',
        N_shortname: null,
        marketcap: 3270000000,
        N_COMPANY_T: 'บริษัท อรินสิริ แลนด์ จำกัด (มหาชน)',
        N_COMPANY_E: 'ARINSIRI LAND PUBLIC COMPANY LIMITED',
        N_URL: 'www.arinsiri.com',
        F_TYPE: 'S',
        N_BUSINESS_TYPE_E: 'ARIN is a property developer for sale .',
        N_BUSINESS_TYPE_T: 'บริษัทดำเนินธุรกิจพัฒนาอสังหาริมทรัพย์เพื่อขาย',
        N_fullname: 'ARINSIRI LAND PUBLIC COMPANY LIMITED',
    },
    {
        N_name: 'AAV',
        N_shortname: 'Air asia สายการบิน ท่าอากาศยาน AA',
        marketcap: 33094714284,
        N_COMPANY_T: 'บริษัท เอเชีย เอวิเอชั่น จำกัด (มหาชน)',
        N_COMPANY_E: 'ASIA AVIATION PUBLIC COMPANY LIMITED',
        N_URL: 'http://www.aavplc.com',
        F_TYPE: 'S',
        N_BUSINESS_TYPE_E:
            "The Company operates as a holding company, the Company holds only Thai AirAsia Co., Ltd , a low fare airline . Thai AirAsia Co., Ltd.'s revenues are mainly from scheduled passenger services and ancillary services.",
        N_BUSINESS_TYPE_T:
            'ประกอบธุรกิจด้านการลงทุนโดยการถือหุ้นในบริษัทอื่น (Holding Company) โดยในปัจจุบัน บริษัทถือหุ้นใน บริษัท ไทยแอร์เอเชีย จำกัดเพียงแห่งเดียว สำหรับบริษัท ไทยแอร์เอเชีย จำกัด ประกอบธุรกิจให้บริการสายการบินราคาประหยัด โดยมีรายได้หลักจากการให้บริการขนส่งผู้โดยสารแบบประจำ (Scheduled Passenger Services) และการให้บริการเสริม (Ancillary Services)',
        N_fullname: 'ASIA AVIATION PUBLIC COMPANY LIMITED',
    },
    {
        N_name: 'SAWANG',
        N_shortname: 'สว่าง SAW SA SAWA',
        marketcap: 252000000,
        N_COMPANY_T: 'บริษัท สว่างเอ็กซ์ปอร์ต จำกัด (มหาชน)',
        N_COMPANY_E: 'SAWANG EXPORT PUBLIC COMPANY LIMITED',
        N_URL: '',
        F_TYPE: 'S',
        N_BUSINESS_TYPE_E:
            'The Company is a manufacturer and distributor of precious stones and jewelry.',
        N_BUSINESS_TYPE_T:
            'ผลิตและจำหน่ายอัญมณีและเครื่องประดับอัญมณีที่ทำด้วยทองคำและเนื้อเงิน และส่งออกอัญมณี ได้แก่ พลอยทับทิม และพลอยไพลิน เป็นต้น',
        N_fullname: 'SAWANG EXPORT PUBLIC COMPANY LIMITED',
    },
    {
        N_name: 'BLA',
        N_shortname: 'บีแอลเอ BL',
        marketcap: 58057244000,
        N_COMPANY_T: 'บริษัท กรุงเทพประกันชีวิต จำกัด (มหาชน)',
        N_COMPANY_E: 'BANGKOK LIFE ASSURANCE PUBLIC COMPANY LIMITED',
        N_URL: 'www.bangkoklife.com',
        F_TYPE: 'S',
        N_BUSINESS_TYPE_E:
            'Bangkok Life Assurance Public Company Limited is a life insurance provider and a provider of comprehensive financial planning with a firm belief that life insurance is a way for an individual to mitigate risks from losses of life or organs, from becoming disabled, and from the lack of income in old age. When an individual is faced with the aforementioned risks, he will  receive benefits in accordance with the insurance contracts as agreed upon in order that he may be relieved of any strains suffered by himself and families with the Company’s paying the benefits to the insureds or the beneficiaries.',
        N_BUSINESS_TYPE_T:
            'บริษัท กรุงเทพประกันชีวิต จำกัด (มหาชน) ดำเนินธุรกิจประกันชีวิตและบริการวางแผนทางการเงินอย่างรอบด้าน โดยการประกันชีวิตเป็นวิธีการที่บุคคลกลุ่มหนึ่งร่วมกันเฉลี่ยภัยอันเนื่องจากการเสียชีวิต การสูญเสียอวัยวะ ทุพพลภาพ และการสูญเสียรายได้ในยามชรา เมื่อบุคคลใดต้องประสบกับภัยเหล่านั้น จะได้รับเงินตามเงื่อนไขข้อตกลงที่ตกลงกันไว้ เพื่อบรรเทาความเดือดร้อนแก่ตนเองและครอบครัว โดยบริษัทจะจ่ายให้แก่ผู้ประสบภัยหรือผู้รับผลประโยชน์',
        N_fullname: 'BANGKOK LIFE ASSURANCE PUBLIC COMPANY',
    },
    {
        N_name: 'M-PAT',
        N_shortname: null,
        marketcap: 417900000,
        N_COMPANY_T: 'กองทุนรวมอสังหาริมทรัพย์เอ็มเอฟซี ป่าตอง เฮอริเทจ',
        N_COMPANY_E: 'MFC PATONG HERITAGE PROPERTY FUND',
        N_URL: 'www.mfcfund.com',
        F_TYPE: 'S',
        N_BUSINESS_TYPE_E:
            'M-PAT is a freehold property fund which initially invest in land and building 183 units of "Patong Night Plaza" condominium, currently running a hotel business under the title "Patong Heritage Hotel" as mid-scale 164-key hotel, including other properties deemed as a component part of land as well as tools and equipments, and other assets related to the operation the hotel located nearby the hotel. M-PAT has policy in procuring benefits from the asset by leasing out the asset to hotel operator Patong Heritage Co., Ltd.for operating as a hotel for 2 years.',
        N_BUSINESS_TYPE_T:
            'ลงทุนในกรรมสิทธิ์ (Freehold) ห้องชุด จำนวน 183 ยูนิต ในอาคารชุด "ป่าตองไนท์พลาซ่าร์" ซึ่งปัจจุบันใช้ดำเนินธุรกิจโรงแรมภายใต้ชื่อ "โรงแรมป่าตอง เฮอริเทจ" (Patong Heritage Hotel) จำนวนห้องพัก 164 ห้อง รวมถึงอุปกรณ์ส่วนควบต่างๆ ตลอดจนทรัพย์สินที่เกี่ยวข้องกับโรงแรมป่าตอง เฮอริเทจ M-PAT ได้นำทรัพย์สินของโรงแรม ป่าตอง เฮอริเทจ จัดหาผลประโยชน์ โดยให้ บริษัท ป่าตอง เฮอริเทจ จำกัด เช่าเป็นระยะเวลา 2 ปี',
        N_fullname: 'MFC PATONG HERITAGE PROPERTY FUND',
    },
    {
        N_name: 'ACG',
        N_shortname: null,
        marketcap: 1170000000,
        N_COMPANY_T: 'บริษัท ออโตคอร์ป โฮลดิ้ง จำกัด (มหาชน)',
        N_COMPANY_E: 'AUTOCORP HOLDING PUBLIC COMPANY LIMITED',
        N_URL: 'www.autocorpgroup.com',
        F_TYPE: 'S',
        N_BUSINESS_TYPE_E:
            'Autocorp Holding PCL (“the Company”) operates the business as a holding company that sell cars and services in the automobile industry as well as the related businesses. Currently the Company invested in 2 subsidiaries as follow:1. Honda Maliwan Co.,Ltd. (“Honda Maliwan”), a Honda dealer and service center. 2. Autoclik by ACG Co.,Ltd. (“Autoclik”) operates the business as a distributor of spare parts and provide repair and maintenance services of all car brands (Fast Fit)',
        N_BUSINESS_TYPE_T:
            'บริษัท ออโตคอร์ป โฮลดิ้ง จำกัด (มหาชน) (“บริษัท”) ประกอบธุรกิจโดยการถือหุ้นในบริษัทอื่น (Holding company) ที่ประกอบธุรกิจจำหน่ายและให้บริการในอุตสาหกรรมรถยนต์ และธุรกิจที่เกี่ยวเนื่องอื่นๆ ปัจจุบัน บริษัทมีการลงทุนในบริษัทย่อย 2 แห่ง ดังนี้1. บริษัท ฮอนด้ามะลิวัลย์ จำกัด (“ฮอนด้ามะลิวัลย์”) เป็นบริษัทผู้จำหน่ายและศูนย์บริการรถยนต์ยี่ห้อฮอนด้า 2. บริษัท ออโตคลิกบายเอซีจี จำกัด (“ออโตคลิก”) ประกอบธุรกิจจำหน่ายอะไหล่รถยนต์และให้บริการซ่อมแซมบำรุงรักษารถยนต์ทุกยี่ห้อประเภทเร่งด่วน (Fast Fit)',
        N_fullname: 'AUTOCORP HOLDING PUBLIC COMPANY LIMITED',
    },
    {
        N_name: 'TAE',
        N_shortname: 'ทีเออี TA',
        marketcap: 1900000000,
        N_COMPANY_T: 'บริษัท ไทย อะโกร เอ็นเนอร์ยี่ จำกัด (มหาชน)',
        N_COMPANY_E: 'THAI AGRO ENERGY PUBLIC COMPANY LIMITED',
        N_URL: 'www.thaiagroenergy.com',
        F_TYPE: 'S',
        N_BUSINESS_TYPE_E:
            'The Company operates the business as a producer and distributor of Denatured Ethanol for use as fuel.',
        N_BUSINESS_TYPE_T:
            'บริษัทประกอบธุรกิจผลิตและจำหน่ายเอทานอลแปลงสภาพ เพื่อใช้เป็นเชื้อเพลิง',
        N_fullname: 'THAI AGRO ENERGY PUBLIC COMPANY LIMITED',
    },
    {
        N_name: 'SAT',
        N_shortname: 'แซท SA',
        marketcap: 8758994216,
        N_COMPANY_T: 'บริษัท สมบูรณ์ แอ๊ดวานซ์ เทคโนโลยี จำกัด (มหาชน)',
        N_COMPANY_E: 'SOMBOON ADVANCE TECHNOLOGY PUBLIC COMPANY LIMITED',
        N_URL: 'www.satpcl.co.th',
        F_TYPE: 'S',
        N_BUSINESS_TYPE_E:
            'The Company operates as a holding company which the main businesses are to manufacture the automotive part and agriculture machinery.',
        N_BUSINESS_TYPE_T:
            'บริษัทประกอบธุรกิจโดยการถือหุ้นในบริษัทอื่น (Holding Company) โดยกลุ่มธุรกิจผลิตชิ้นส่วนยานยนต์และเครื่องจักรกลการเกษตรเป็นธุรกิจหลัก',
        N_fullname: 'SOMBOON ADVANCE TECHNOLOGY',
    },
    {
        N_name: 'MATCH',
        N_shortname: 'แมทช์ MAT MA MATC',
        marketcap: 1531992317,
        N_COMPANY_T: 'บริษัท แม็ทชิ่ง แม็กซิไมซ์ โซลูชั่น จำกัด (มหาชน)',
        N_COMPANY_E: 'MATCHING MAXIMIZE SOLUTION PUBLIC COMPANY LIMITED',
        N_URL: 'http://www.matchinggroup.com',
        F_TYPE: 'S',
        N_BUSINESS_TYPE_E:
            'The Company’s core businesses consist of equipment rental business, studio rental business, content business and a joint venture producing feature films.',
        N_BUSINESS_TYPE_T:
            'การดำเนินธุรกิจหลักของบริษัทประกอบด้วย ธุรกิจให้บริการและให้เช่าอุปกรณ์ถ่ายทำภาพยนตร์ ธุรกิจ Content และการร่วมลงทุนในกิจการร่วมค้าเกี่ยวกับธุรกิจผลิตภาพยนตร์',
        N_fullname: 'MATCHING MAXIMIZE SOLUTION',
    },
    {
        N_name: 'APCS',
        N_shortname: 'เอพีซีเอส APC AP',
        marketcap: 3299999310,
        N_COMPANY_T: 'บริษัท เอเซีย พรีซิชั่น จำกัด (มหาชน)',
        N_COMPANY_E: 'ASIA PRECISION PUBLIC COMPANY LIMITED',
        N_URL: 'http://www.asiaprecision.com',
        F_TYPE: 'S',
        N_BUSINESS_TYPE_E:
            'The company offers a range of engineering services with the core business in Engineering, Procurement, and Construction (EPC), providing a one-stop service from turnkey construction management to Operation & Maintenance (O&M). The company has expertise in construction of alternative energy facilities and public utility systems of all kinds. Other business divisions include Precision Metal Parts manufacturing and Utilities.',
        N_BUSINESS_TYPE_T:
            'บริษัทเป็นกลุ่มกิจการด้านวิศวกรรม โดยมี EPC เป็นธุรกิจหลัก เชี่ยวชาญในการบริหารโครงการก่อสร้างพลังงานทางเลือกและระบบสาธารณูปโภคประเภทต่างๆ แบบครบวงจร รวมถึงให้บริการด้านดำเนินการและการบำรุงรักษา (O&M) และบริษัทดำเนินธุรกิจอื่นประกอบด้วย ธุรกิจผลิตชิ้นส่วนโลหะความเที่ยงตรงสูง (Precision Metal Parts) และธุรกิจระบบสาธารณูปโภค (Utilities)',
        N_fullname: 'ASIA PRECISION PUBLIC COMPANY LIMITED',
    },
    {
        N_name: 'SALEE',
        N_shortname: 'สาลี SAL SA SALE',
        marketcap: 1763761519,
        N_COMPANY_T: 'บริษัท สาลี่อุตสาหกรรม จำกัด (มหาชน)',
        N_COMPANY_E: 'SALEE INDUSTRY PUBLIC COMPANY LIMITED',
        N_URL: 'www.saleeind.com',
        F_TYPE: 'S',
        N_BUSINESS_TYPE_E:
            'The Company is a manufacturer of plastic components by vacuum forming and injection molding. Its subsidiaries are self - adhesive label producer and plastic products.',
        N_BUSINESS_TYPE_T:
            'รับจ้างผลิตชิ้นส่วนพลาสติกโดยกระบวนการขึ้นรูปพลาสติกและฉีดพลาสติก โดยมีบริษัทย่อยดำเนินธุรกิจพิมพ์ฉลากสินค้าคุณภาพสูงและธุรกิจผลิตและจำหน่ายสินค้าพลาสติกประเภทของใช้ในครัวเรือน',
        N_fullname: 'SALEE INDUSTRY PUBLIC COMPANY LIMITED',
    },
    {
        N_name: 'AMATAV',
        N_shortname: null,
        marketcap: 7012500000,
        N_COMPANY_T: 'บริษัท อมตะ วีเอ็น จำกัด (มหาชน)',
        N_COMPANY_E: 'AMATA VN PUBLIC COMPANY LIMITED',
        N_URL: 'http://www.amatavn.com',
        F_TYPE: 'S',
        N_BUSINESS_TYPE_E:
            'AMATA VN PCL is a holding company which holds 89.99% shares in Amata City Bien Hoa Joint Stock Company (ACBH) as a core company. ACBH develops and operates industrial estate and other related businesses in Amata City Bien Hoa Industrial Estate in Vietnam. ACBH has revenue from 1) Industrial, Commercial and Residential Land Lease 2) Ready Built Factories and Office Rental Services 3) Infrastructure Services',
        N_BUSINESS_TYPE_T:
            'บริษัท อมตะ วีเอ็น จำกัด (มหาชน) ประกอบธุรกิจการลงทุนในบริษัทอื่น (Holding Company) โดยถือหุ้นใน Amata City Bien Hoa Joint Stock Company (บริษัทแกน) ร้อยละ 89.99  ซึ่งประกอบธุรกิจพัฒนานิคมอุตสาหกรรม Amata City Bien Hoa ประเทศเวียดนาม โดยมีรายได้จาก 1) การขายที่ดินในเขตนิคมอุตสาหกรรม เขตพาณิชยกรรมและที่อยู่อาศัย 2) การให้บริการเช่าโรงงานสำเร็จรูป อาคารสำนักงาน 3) การบริการสาธารณูปโภค',
        N_fullname: 'AMATA VN PUBLIC COMPANY LIMITED',
    },
    {
        N_name: 'GLOBAL',
        N_shortname: 'โกลบอล GLO GL GLOB',
        marketcap: 93153692620,
        N_COMPANY_T: 'บริษัท สยามโกลบอลเฮ้าส์ จำกัด (มหาชน)',
        N_COMPANY_E: 'SIAM GLOBAL HOUSE PUBLIC COMPANY LIMITED',
        N_URL: 'www.globalhouse.co.th',
        F_TYPE: 'S',
        N_BUSINESS_TYPE_E:
            'The Company operates its businesses under concept of modern trade from construction material to home improvement supplies. It is a one-stop shopping home center, which offers construction material, home decorative products, tools and equipment used in construction, home improvement, and household and gardening decoration in modern trade warehouse style. Additionally, the Company implemented a drive-through system to increase ease of access and convenience for customer.',
        N_BUSINESS_TYPE_T:
            'เป็นศูนย์จำหน่ายสินค้าวัสดุก่อสร้าง วัสดุตกแต่ง เครื่องมือ อุปกรณ์ที่ใช้ในงานก่อสร้าง ต่อเติม ตกแต่ง บ้านและสวนแบบควบวงจร (one stop shopping center) โดยใช้ชื่อทางการค้าว่า โกลบอล เฮ้าส์ (Global House) โดยนำระบบ Drive-through มาใช้เพื่อเพิ่มความสะดวกในการรับสินค้าโครงสร้างของลูกค้า',
        N_fullname: 'SIAM GLOBAL HOUSE PUBLIC COMPANY LIMITED',
    },
    {
        N_name: 'HUMAN',
        N_shortname: null,
        marketcap: 10756300342,
        N_COMPANY_T: 'บริษัท ฮิวแมนิก้า จำกัด (มหาชน)',
        N_COMPANY_E: 'HUMANICA PUBLIC COMPANY LIMITED',
        N_URL: 'www.humanica.com',
        F_TYPE: 'S',
        N_BUSINESS_TYPE_E:
            'The group of company operates as a software developer to implement and provide human resources management services and payroll outsourcing including accounting and finance outsourcing services.',
        N_BUSINESS_TYPE_T:
            'กลุ่มบริษัทประกอบธุรกิจเป็นผู้พัฒนาซอฟต์แวร์เพื่อจำหน่ายและให้บริการติดตั้งซอฟต์แวร์ระบบบริหารงานทรัพยากรบุคคลและทรัพยากรองค์กร รวมทั้งให้บริการจัดทำเงินเดือนและจัดทำบัญชี',
        N_fullname: 'HUMANICA PUBLIC COMPANY LIMITED',
    },
    {
        N_name: 'ASP',
        N_shortname: 'หลักเอ เอเอสพี AS',
        marketcap: 6401194374,
        N_COMPANY_T: 'บริษัท เอเซีย พลัส กรุ๊ป โฮลดิ้งส์ จำกัด (มหาชน)',
        N_COMPANY_E: 'ASIA PLUS GROUP HOLDINGS PUBLIC COMPANY LIMITED',
        N_URL: 'www.asiaplusgroup.co.th',
        F_TYPE: 'S',
        N_BUSINESS_TYPE_E:
            'ASP is a holding company which invests in high growth potential businesses. Our current core businesses are securities brokerage, investment, investment banking, asset management and private equity.',
        N_BUSINESS_TYPE_T:
            'บริษัทดำเนินธุรกิจด้านการลงทุนในธุรกิจที่มีศักยภาพในการเติบโตสูง  โดยธุรกิจหลักในปัจจุบันประกอบด้วย ธุรกิจนายหน้าซื้อขายหลักทรัพย์ ธุรกิจการลงทุน ธุรกิจวาณิชธนกิจ ธุรกิจบริหารสินทรัพย์ และธุรกิจกิจการร่วมลงทุน',
        N_fullname: 'ASIA PLUS GROUP HOLDINGS PUBLIC COMPANY',
    },
    {
        N_name: 'ASW',
        N_shortname: null,
        marketcap: 6763356840,
        N_COMPANY_T: 'บริษัท แอสเซทไวส์ จำกัด (มหาชน)',
        N_COMPANY_E: 'ASSETWISE PUBLIC COMPANY LIMITED',
        N_URL: 'www.assetwise.co.th',
        F_TYPE: 'S',
        N_BUSINESS_TYPE_E:
            'ASW is a holding company which has subsidiary operating core business companies that operate in property development for sale, including condominium, single house, townhome and home office.',
        N_BUSINESS_TYPE_T:
            'บริษัทประกอบธุรกิจโดยการถือหุ้นในบริษัทอื่น (Holding Company) โดยมีบริษัทย่อยที่ประกอบธุรกิจหลักเกี่ยวกับธุรกิจพัฒนาอสังหาริมทรัพย์เพื่อขายทั้งประเภท      โครงการคอนโดมิเนียม  บ้านจัดสรร ทาวน์โฮม และโฮมออฟฟิศ',
        N_fullname: 'ASSETWISE PUBLIC COMPANY LIMITED',
    },
    {
        N_name: 'AIT',
        N_shortname: null,
        marketcap: 6395947807,
        N_COMPANY_T: 'บริษัท แอ็ดวานซ์ อินฟอร์เมชั่น เทคโนโลยี จำกัด (มหาชน)',
        N_COMPANY_E: 'ADVANCED INFORMATION TECHNOLOGY PUBLIC CO.,LTD.',
        N_URL: 'www.ait.co.th',
        F_TYPE: 'S',
        N_BUSINESS_TYPE_E:
            'A System Integrator or SI of computer system and computer communication, providing services in both the private and the public sector. Our service can be Turn Key Project including the consultation, project planning, system design, implementation, installation, training and maintenance.',
        N_BUSINESS_TYPE_T:
            'ผู้ออกแบบระบบเครือข่ายและระบบสื่อสารอย่างครบวงจร (System Integrator หรือ SI) ให้บริการในกลุ่มลูกค้าทั้งภาครัฐและเอกชน โดยมีลักษณะการขายเป็นแบบเบ็ดเสร็จ หรือ เทิร์นคีย์ (Turn Key) ตั้งแต่การให้คำปรึกษา การวางแผนงานโครงการ การออกแบบระบบ การดำเนินการ การติดตั้ง การฝึกอบรม และการซ่อมบำรุงรักษา',
        N_fullname: 'ADVANCED INFORMATION TECHNOLOGY',
    },
    {
        N_name: 'MAKRO',
        N_shortname: 'แมคโคร MAK MA MAKR',
        marketcap: 359730999000,
        N_COMPANY_T: 'บริษัท สยามแม็คโคร จำกัด (มหาชน)',
        N_COMPANY_E: 'SIAM MAKRO PUBLIC COMPANY LIMITED',
        N_URL: 'www.siammakro.co.th',
        F_TYPE: 'S',
        N_BUSINESS_TYPE_E:
            'Operating a cash and carry wholesale business under "Makro" name in order to sell food and non-food products for all customers nationwide. Key Makro customers are small to medium sized professional operators i.e. small retailers, HoReCa, institutes, and services operators',
        N_BUSINESS_TYPE_T:
            'ประกอบธุรกิจศูนย์จำหน่ายสินค้าแบบชำระเงินสด  และบริการตนเอง       ภายใต้ชื่อ     "แม็คโคร"  ในการจัดจำหน่ายสินค้าอุปโภคบริโภคให้แก่ลูกค้าทั่วประเทศ โดยมีกลุ่มลูกค้าเป้าหมายเป็นผู้ประกอบการธุรกิจขนาดเล็กถึงขนาดกลาง ได้แก่ กลุ่มร้านค้าปลีกรายย่อย กลุ่มโฮเรก้า กลุ่มสถาบันต่างๆ  และกลุ่มผู้ประกอบอาชีพอิสระ รวมถึงผู้ประกอบธุรกิจบริการ',
        N_fullname: 'SIAM MAKRO PUBLIC COMPANY LIMITED',
    },
    {
        N_name: 'BANPU',
        N_shortname: 'บ้านปู ถ่านหิน BAN BA BANP',
        marketcap: 94048910735,
        N_COMPANY_T: 'บริษัท บ้านปู จำกัด (มหาชน)',
        N_COMPANY_E: 'BANPU PUBLIC COMPANY LIMITED',
        N_URL: 'http://www.banpu.com',
        F_TYPE: 'S',
        N_BUSINESS_TYPE_E:
            '“Integrated Energy Solutions Company ”by creating growth throughout its 3 core groups of businesses, which are Energy Resources (coal and gas including related operations such as marketing, trading, logistics, fuel procurement, and transmission), Energy Generation (conventional and renewable power plants), and Energy Technology (total solar energy solutions, energy storage system and energy technology system) By incorporating both conventional and unconventional or renewable businesses within the Group’s portfolio structure, Banpu then has a stronger integration across its core business units resulting in more effective resources management and a balanced business expansion which offers sustainable energy solutions for consumers, communities, society and the environment.',
        N_BUSINESS_TYPE_T:
            '“บริษัทพลังงานแบบครบวงจร” โดยสร้างการเติบโตครอบคลุม 3 กลุ่มธุรกิจหลัก ได้แก่ กลุ่มธุรกิจแหล่งพลังงาน (ถ่านหินและก๊าซธรรมชาติ รวมถึงงานที่เกี่ยวข้อง อาทิ การตลาด การค้า โลจิสติกส์ และการจัดหาเชื้อเพลิง และสายส่ง) กลุ่มธุรกิจผลิตพลังงาน (โรงไฟฟ้าจากพลังงานเชื้อเพลิงทั่วไป และจากพลังงานหมุนเวียน) และกลุ่มธุรกิจเทคโนโลยีพลังงาน (ระบบผลิตไฟฟ้าจากพลังงานแสงอาทิตย์แบบครบวงจร ระบบจัดเก็บพลังงาน และระบบการจัดการเทคโนโลยีพลังงาน ซึ่งการผสานธุรกิจด้านพลังงานทั้งในรูปแบบดั้งเดิมและรูปแบบใหม่หรือพลังงานหมุนเวียน ไว้ในโครงสร้างขององค์กรอย่างครบถ้วนนี้ ทำให้บ้านปูฯ สามารถผนึกกำลังระหว่างกันในกลุ่มธุรกิจหลักเพื่อบริหารจัดการทรัพยากรได้อย่างมีประสิทธิภาพ สร้างความสมดุลและขยายการเติบโตในกลุ่มธุรกิจพลังงานของบ้านปูฯ ที่ตอบโจทย์ผู้บริโภค ชุมชน สังคม และสิ่งแวดล้อม',
        N_fullname: 'BANPU PUBLIC COMPANY LIMITED',
    },
    {
        N_name: 'PACE',
        N_shortname: 'เพช PAC PA',
        marketcap: null,
        N_COMPANY_T: 'บริษัท เพซ ดีเวลลอปเมนท์ คอร์ปอเรชั่น จำกัด (มหาชน)',
        N_COMPANY_E: 'PACE DEVELOPMENT CORPORATION PUBLIC COMPANY LIMITED',
        N_URL: 'http://www.pacedev.com',
        F_TYPE: 'S',
        N_BUSINESS_TYPE_E:
            'The Company is engaged in high-end real estate development, lifestyle retail gourmet food and beverages including the ownership of global brand Dean & DeLuca Inc., USA. Currently, PACE is developing MahaNakhon, a mixed-use project that consists of 5 star luxury boutique hotel (The Bangkok Edition), super-luxury residential condominium (The Ritz-Carlton Residences, Bangkok) and lifestyle retail center (MahaNakhon CUBE, Retail Hill, and Sky Observation Deck) located on Narathiwas-Rajanagarindra Road, and developing Nimit Langsuan project, a super-luxury condominium on Langsuan Road, and MahaSamutr project, resort-style luxury villas and luxurious country club, located in Hua Hin district, Prachaubkhirikhan province.',
        N_BUSINESS_TYPE_T:
            'บริษัทประกอบธุรกิจพัฒนาอสังหาริมทรัพย์ระดับไฮเอนด์ ธุรกิจไลฟ์สไตล์รีเทลด้านอาหารและเครื่องดื่มกูร์เม่ต์ ภายใต้ของเครื่องหมายการค้า "ดีน แอนด์ เดลูก้า" โดยเป็นเจ้าของสาขาดีน แอนด์ เดลูก้าทั้งหมดในประเทศสหรัฐอเมริกา และประเทศไทย ปัจจุบันอยู่ระหว่างพัฒนาโครงการมหานคร บนถนนนราธิวาสราชนครินทร์ ซึ่งมีลักษณะผสมผสาน (Mixed use) ทั้งโรงแรมระดับ 5 ดาว (บางกอก เอดิชั่น) อาคารพักอาศัยระดับซูเปอร์ลักชัวรี่ (เดอะ ริทซ์-คาร์ลตัน เรสซิเดนเซส บางกอก) และไลฟ์สไตล์รีเทล (มหานคร คิวบ์   รีเทล ฮิลล์  และสกาย ออบเซอร์เวชั่น เดค) และอยู่ระหว่างการพัฒนาโครงการนิมิต หลังสวน ซึ่งเป็นคอนโดมิเนียมระดับลักชัวรี่ บนถนนหลังสวน และโครงการมหาสมุทร ซึ่งเป็นวิลล่าตากอากาศ และคันทรี่ คลับสุดหรู ตั้งอยู่ที่อำเภอหัวหิน จังหวัดประจวบคีรีขันธ์',
        N_fullname: 'PACE DEVELOPMENT CORPORATION',
    },
    {
        N_name: 'APEX',
        N_shortname: 'เอพีเอ็ก AP',
        marketcap: null,
        N_COMPANY_T: 'บริษัท เอเพ็กซ์ ดีเวลลอปเม้นท์ จำกัด (มหาชน)',
        N_COMPANY_E: 'APEX DEVELOPMENT PUBLIC COMPANY LIMITED',
        N_URL: 'www.apexpcl.com',
        F_TYPE: 'S',
        N_BUSINESS_TYPE_E:
            'Property development for sale such as hotels, condos and land and villas. Moreover, APEX provide service for customer to operate apartments and villas for rent, where as APEX will charge a management fee and pay the investment return to the customer as contract.',
        N_BUSINESS_TYPE_T:
            'พัฒนาอสังหาริมทรัพย์เพื่อขายเป็นอาคารชุดโรงแรม อาคารชุดพักอาศัย และที่ดินจัดสรรพร้อมบ้านพักตากอากาศ รวมถึงให้บริการจัดการให้เช่าห้องชุด หรือบ้านพักตากอากาศที่ลูกค้าซื้อบางส่วนนำออกให้เช่าในระบบโรงแรม โดยบริษัทจะเก็บค่าธรรมเนียมในการบริหารจัดการ และมีผลตอบแทนให้กับผู้ซื้อตามที่ระบุในสัญญา',
        N_fullname: 'APEX DEVELOPMENT PUBLIC COMPANY LIMITED',
    },
    {
        N_name: 'SPALI',
        N_shortname:
            'ศุภาลัย แกรนด์เลค ศุภาลัย ศุภาลัย วิลล์ สปาลี SPA SP SPAL',
        marketcap: 41790046935,
        N_COMPANY_T: 'บริษัท ศุภาลัย จำกัด (มหาชน)',
        N_COMPANY_E: 'SUPALAI PUBLIC COMPANY LIMITED',
        N_URL: 'http://www.supalai.com',
        F_TYPE: 'S',
        N_BUSINESS_TYPE_E:
            'The Company engages in the operation of real estate development projects include 1) detached houses, duplex houses, townhouses, and condominiums projects in a variety of areas throughout Bangkok and provincial 2)  office buildings for rent in the commercial districts and 3) hotel business in the provincial',
        N_BUSINESS_TYPE_T:
            'พัฒนาอสังหาริมทรัพย์ประเภท 1) ที่อยู่อาศัย ทั้งบ้านและที่ดินจัดสรร อาคารชุด ในทำเลทั่วเขตกรุงเทพมหานคร ปริมณฑล รวมถึงต่างจังหวัด 2) เพื่อการพาณิชย์ ได้แก่ อาคารสำนักงานให้เช่า  และ 3) ธุรกิจรีสอร์ทโรงแรมในต่างจังหวัด',
        N_fullname: 'SUPALAI PUBLIC COMPANY LIMITED',
    },
];

const companyService = new CompanyService(mockCompanyList);

export default companyService;
