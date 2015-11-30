var resWelcome = {
    Logo_png : "res/HelloWorld.png",
    Login_png : "res/HelloWorld.png"
};

var res = {
    HelloWorld_png : "res/HelloWorld.png",
    MainScene_json : "res/MainScene.json",
    HPProgressBar: "res/Commons/ProgressBar.png",
    HPProgressBarBg: "res/Commons/ProgressBarBg.png",
    TempBg: "res/Commons/pvp2048.png",
    MarkBg: "res/Commons/iconbg_mark.png"
};

var resCommon = {

};

var resPlist_Chars = {
    Char1000_Lvl1_p : "res/Characters/1_0.plist",
    Char1000_Lvl1_t : "res/Characters/1_0.png",
    Char1000_Lvl2_p : "res/Characters/1_1.plist",
    Char1000_Lvl2_t : "res/Characters/1_1.png",
    Char1000_Lvl3_p : "res/Characters/1_2.plist",
    Char1000_Lvl3_t : "res/Characters/1_2.png",
    Char1000_Lvl4_p : "res/Characters/1_3.plist",
    Char1000_Lvl4_t : "res/Characters/1_3.png",
    Char1000_Lvl5_p : "res/Characters/1_4.plist",
    Char1000_Lvl5_t : "res/Characters/1_4.png",

    Char1002_Lvl1_p : "res/Characters/2_0.plist",
    Char1002_Lvl1_t : "res/Characters/2_0.png",
    Char1002_Lvl2_p : "res/Characters/2_1.plist",
    Char1002_Lvl2_t : "res/Characters/2_1.png",
    Char1002_Lvl3_p : "res/Characters/2_2.plist",
    Char1002_Lvl3_t : "res/Characters/2_2.png",
    Char1002_Lvl4_p : "res/Characters/2_3.plist",
    Char1002_Lvl4_t : "res/Characters/2_3.png",
    Char1002_Lvl5_p : "res/Characters/2_4.plist",
    Char1002_Lvl5_t : "res/Characters/2_4.png",

    Char1003_Lvl1_p : "res/Characters/2_0.plist",
    Char1003_Lvl1_t : "res/Characters/2_0.png",
    Char1003_Lvl2_p : "res/Characters/2_1.plist",
    Char1003_Lvl2_t : "res/Characters/2_1.png",
    Char1003_Lvl3_p : "res/Characters/2_2.plist",
    Char1003_Lvl3_t : "res/Characters/2_2.png",
    Char1003_Lvl4_p : "res/Characters/2_3.plist",
    Char1003_Lvl4_t : "res/Characters/2_3.png",
    Char1003_Lvl5_p : "res/Characters/2_4.plist",
    Char1003_Lvl5_t : "res/Characters/2_4.png",


    Char1004_Lvl1_p : "res/Characters/2_0.plist",
    Char1004_Lvl1_t : "res/Characters/2_0.png",
    Char1004_Lvl2_p : "res/Characters/2_1.plist",
    Char1004_Lvl2_t : "res/Characters/2_1.png",
    Char1004_Lvl3_p : "res/Characters/2_2.plist",
    Char1004_Lvl3_t : "res/Characters/2_2.png",
    Char1004_Lvl4_p : "res/Characters/2_3.plist",
    Char1004_Lvl4_t : "res/Characters/2_3.png",
    Char1004_Lvl5_p : "res/Characters/2_4.plist",
    Char1004_Lvl5_t : "res/Characters/2_4.png"
};

var resCSV = {
    CharInfo: "res/csv/chars.csv",
    BuildInfo: "res/csv/buildings.csv",
    AnimInfo: "res/csv/animations.csv"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}

for (var i in resPlist_Chars) {
    g_resources.push(resPlist_Chars[i]);
}

for (var i in resCSV) {
    g_resources.push(resCSV[i]);
}
