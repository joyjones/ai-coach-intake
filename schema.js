// Stable field IDs are shared with the receiver. Never rename IDs after launch without migration.
const SECTIONS = [
 {title:'先认识一下你',desc:'让陪练从你的工作出发。',fields:[
 ['name','希望我怎么称呼你？','text',true],['contact','怎么联系你？','text',true,null,'微信或邮箱，任选一个即可'],['industry','你所在的行业','text',true],['role','目前的职业、角色与主要职责','textarea',true],['team','你主要独立工作，还是与团队协作？','textarea',false,null,'如有团队，可说明人数及你的分工']]},
 {title:'找到最值得做的一件事',desc:'具体一点，我们就能把三小时用在真正重要的事情上。',fields:[
 ['pain','哪些工作最繁琐、最常重复？','textarea',true,null,'列出 1—3 项，例如每周整理销售报表'],['goal','如果只做成一件事，你希望是什么？','textarea',true],['workflow','现在怎么完成这件事？','textarea',true,null,'使用什么资料 → 经过什么步骤 → 最后交给谁'],['frequency','多久做一次，每次大约花多久？','text',true],['acceptance','做到什么程度，你会觉得满意？','textarea',true,null,'例如：得到一份可直接向客户演示的 5 页方案。也可描述参考例子'],['sample','能否准备有权使用、已脱敏的真实样本？','select',true,['可以','需要指导','暂时不能']],['constraints','必须使用的软件、文件格式或截止时间','textarea',false]]},
 {title:'你与 AI 的距离',desc:'没有基础也可以，真实情况比“标准答案”更有帮助。',fields:[
 ['tools','现在用哪些 AI 工具，通常做什么？','textarea',true,null,'没有用过请填写“还没使用”'],['level','哪一种更接近你现在的状态？','select',true,['还没使用过','偶尔简单问答','能反复沟通并完成产出','能组织项目或工作流']],['failure','有没有一次 AI 让你不满意？','textarea',false,null,'简单说说发生了什么']]},
 {title:'让现场顺利开始',desc:'提前排除设备问题，课堂才能专注于工作本身。',fields:[
 ['os','你会携带什么电脑？','select',true,['Windows 笔记本','Mac 笔记本','其他系统','无法携带电脑']],['computer','以下操作，哪些你能独立完成？','checks',true,['创建并找到文件夹','下载与解压文件','安装软件','浏览器登录与验证码','复制文件路径','截图并描述错误','以上均需协助']],['permissions','设备安装权限及公司限制','textarea',true,null,'能否自行安装软件？是否限制外部工具或数据使用？'],['precheck','能否在课前完成工具登录和运行检查？','select',true,['可以','需要少量指导','不确定']],['voice','是否愿意尝试语音输入？有什么需要提前照顾的？','textarea',false,null,'如场地不方便说话、语言或无障碍需求']]},
 {title:'投入、安排与最后确认',desc:'把期待说清楚，才能为你安排合适的陪练。',fields:[
 ['budget','除课程费外，每月可接受的 AI 工具预算','select',true,['暂不付费','200 元以内','200—500 元','500—1500 元','1500 元以上','先评估价值']],['practice','课后一周能安排多少练习时间？','select',true,['不足 1 小时','1—3 小时','3 小时以上','不确定']],['privacy','工作资料的使用限制','select',true,['无特殊限制','有敏感内容，但可脱敏','公司限制严格','不确定']],['style','你期待的陪练方式','select',true,['自己操作为主，老师指导','先看演示，再自己复做','希望老师代做']],['schedule','所在城市、可约时间与场地条件','textarea',true,null,'只需城市，不要填写家庭详细地址'],['extra','还有什么提前知道会让陪练更有效？','textarea',false]]}
];
if(typeof module!=='undefined') module.exports=SECTIONS;
