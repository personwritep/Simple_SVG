// ==UserScript==
// @name        Simple SVG 🔵
// @namespace        http://tampermonkey.net/
// @version        1.3
// @description        任意のブラウザ画面でpathコードを簡略化　ショートカット「F10」
// @author        Ameba Blog User
// @match        https://*/*
// @run-at        document-start
// @grant        none
// @updateURL        https://github.com/personwritep/Simple_SVG/raw/main/Simple_SVG.user.js
// @downloadURL        https://github.com/personwritep/Simple_SVG/raw/main/Simple_SVG.user.js
// ==/UserScript==


if(!location.hostname.includes('example.com')){
    window.addEventListener('keydown', check_key);
    function check_key(event){
        if(event.keyCode==121){ // ショートカット「F10」
            event.preventDefault();
            event.stopImmediatePropagation();
            let win_apper='left=100, top=100, width=1024, height=800';
            window.open('https://example.com/', null , win_apper); }}}


if(location.hostname.includes('example.com')){
    env();
    main(); }



function env(){
    let head=document.head;
    if(head){
        let lang='<meta http-equiv="Content-Language" content="ja">';
        head.insertAdjacentHTML('beforeend', lang);

        let pre_style=head.querySelector('style');
        if(pre_style){
            pre_style.remove(); }}

    let pre_div=document.querySelector('body > div');
    if(pre_div){
        pre_div.remove(); }}



function main(){

    let style=
        'body { background: #000; } '+
        '#base_board { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; '+
        'z-index: 1; background: #000; } '+
        '#base_board div { box-sizing: content-box; } '+
        '#work_contena { position: fixed; top: 0; width: 100%; } '+
        '#help { font: normal 16px Meiryo; padding: 4px 50px 0; height: 30px; '+
        'margin: 20px 0 30px; color: #fff; background: #5a7582; white-space: nowrap; } '+
        '#help .help_svg { vertical-align: -9px; cursor: pointer; } '+
        '#help .help_svg:hover { filter: brightness(1.5); } '+

        '.fn { font: bold 16px/24px Meiryo; margin-right: 6px; padding: 0 4px; height: 24px; '+
        'border: 1px solid #fff; border-radius: 3px; color: #000; background: #a3e1ff; '+
        'outline: none; cursor: pointer; } '+
        '.fn:hover { background: #def2fc; } '+
        '.fn .nf { margin: 0 -2px 0 2px; font-size: 13px; vertical-align: 1px; opacity: 0.2; } '+
        '.fn.f_0, .fn.f_8, .fn.f_10 { width: 44px; } '+

        '#panel { display: flex; color: #fff; padding-left: 40px; } '+
        '.p_count, .p_compress, .p_size, .p_attr, .p_stroke, .p_style { '+
        'font: normal 16px Meiryo; height: 24px; margin-right: 10px; '+
        'padding: 11px 0 10px 10px; border: 1px solid #8f9fa7; } '+
        '.p_count { min-width: 178px; flex-shrink: 0; padding-right: 12px; } '+
        '.p_compress { width: 244px; flex-shrink: 0; white-space: nowrap; } '+
        '.p_size { width: 98px; flex-shrink: 0; } '+
        '.p_attr { width: 96px; flex-shrink: 0; } '+
        '.p_stroke { width: 118px; flex-shrink: 0; } '+
        '.p_style { width: 106px; flex-shrink: 0; } '+

        '.or_panel, .ne_panel { font: normal 16px Meiryo; '+
        'position: absolute; top: 172px; color: #fff; } '+
        '.or_panel { left: 8vw; } '+
        '.ne_panel { left: 52vw;  white-space: nowrap; } '+
        '.detail t { font: normal 10px Meiryo; } '+
        '.detail tt { display: inline-block; width: 215px; font: normal 16px Meiryo; } '+
        '.plus, .detail { position: absolute; } '+
        '.fade_out { opacity: 0; transition: opacity .4s; } '+
        '.fade_in { opacity: 1; transition: opacity .4s; } '+
        '.or, .ne { position: absolute; top: 200px; width: 40vw; height: 40vw; '+
        'display: flex; justify-content: center; overflow: hidden; background: #fff; } '+
        '.or { left: 8vw; } '+
        '.ne { left: 52vw; } '+
        '.or svg, .ne svg { align-self: center; } '+
        '.file_input { display: none; }';

    let help_SVG=
        '<svg height="28" width="28" viewBox="0 0 210 220">'+
        '<path d="M89 22C71 25 54 33 41 46C7 81 11 142 50 171C58 177 68 182 78 '+
        '185C90 188 103 189 115 187C126 185 137 181 146 175C155 169 163 162 169 '+
        '153C190 123 189 80 166 52C147 30 118 18 89 22z" style="fill: #97d4f3;"></path>'+
        '<path d="M67 77C73 75 78 72 84 70C94 66 114 67 109 83C106 91 98 95 93 '+
        '101C86 109 83 116 83 126L111 126C112 114 122 108 129 100C137 90 141 76 '+
        '135 64C127 45 101 45 84 48C80 49 71 50 68 54C67 56 67 59 67 61L67 77M'+
        '85 143L85 166L110 166L110 143L85 143z" style="fill:#000;"></path>'+
        '</svg>';

    let control=
        '<div id="base_board">'+
        '<div id="work_contena">'+
        '<div id="help">'+
        '<button class="f_0 fn">ESC</button>Simple SVG 終了　　'+
        '<button class="f_8 fn">F8</button>画像コードの表示　　'+
        '<button class="f_9 fn">F9<span class="nf">⚪</span></button>'+
        'SVG画像の拡大表示　　'+
        '<button class="f_10 fn">F10</button>SVG画像ファイルの読込み　　'+
        '<a class="help_svg">'+ help_SVG +'</a></div>'+
        '<div id="panel">'+
        '<div class="p_count">　</div>'+
        '<div class="p_compress">'+
        '<button class="f_1 fn">F1<span class="nf">⚪</span></button>S　'+
        '<button class="f_2 fn">F2<span class="nf">⚪</span></button>M　'+
        '<button class="f_3 fn">F3<span class="nf">⚪</span></button>L　'+
        '</div>'+
        '<div class="p_size">'+
        '<button class="f_4 fn">F4<span class="nf">⚪</span></button>Size</div>'+
        '<div class="p_attr">'+
        '<button class="f_5 fn">F5<span class="nf">⚪</span></button>Attr</div>'+
        '<div class="p_stroke">'+
        '<button class="f_6 fn">F6<span class="nf">⚪</span></button>Stroke</div>'+
        '<div class="p_style">'+
        '<button class="f_7 fn">F7<span class="nf">⚪</span></button>Style</div>'+
        '</div>'+
        '<div class="or_panel">デフォルト画像</div>'+
        '<div class="ne_panel">処理適用画像　　'+
        '<span class="plus"></span><span class="detail"></span></div>'+
        '<div class="or source"></div>'+
        '<div class="ne source"></div>'+
        '<input class="file_input" type="file">'+
        '</div><style>' + style +'</style></div>';

    document.body.insertAdjacentHTML('beforeend', control);



    let withdraw=0; // キー入力の有効フラグ
    let output_open=0; // 出力画面の表示フラグ
    let end_open=0; // 終了画面の表示フラグ
    let mag_view=0; // 拡大参照のフラグ
    let size_mode=0; // width・height属性の有無
    let attr_mode=0; // 一般の属性整理の有無
    let stroke_mode=0; // strokeスタイル属性の有無
    let style_mode=0; // 一般のスタイル属性削除の有無
    let f_mode=0; // 四捨五入の処理形式
    let dot2; // 💢 2dot連結のd値数
    let dot3; // 💢 3dot連結のd値数
    let row_count; // コード1行の文字数

    row_count=localStorage.getItem('SSVG')*1;
    if(!row_count){
        row_count=80; // 🔴🔴 ソースコード 1行文字数の初期値設定
        localStorage.setItem('SSVG', row_count); }


    disp_reset();
    disp_result_plus();
    help_link();

    catch_key();
    catch_mouse();



    function catch_key(){
        window.addEventListener('keydown', check_key);
        function check_key(event){
            if(event.keyCode==27){ // ショートカット「ESC」
                func_seletor(0); }

            if(withdraw==0){
                for(let k=1; k<11; k++){
                    if(event.keyCode==k+111){ // ショートカット「F1」～「F10」
                        event.preventDefault();
                        event.stopImmediatePropagation();
                        func_seletor(k); }}}
        }} // catch_key()



    function catch_mouse(){
        for(let k=0; k<11; k++){
            if(document.querySelector('button.f_'+k)){
                document.querySelector('button.f_'+k).onclick=()=>{
                    func_seletor(k); }}}
    } // catch_mouse()



    function func_seletor(n){
        switch (n){
            case 0: esc(); break;
            case 1: f_1(); break;
            case 2: f_2(); break;
            case 3: f_3(); break;
            case 4: f_4(); break;
            case 5: f_5(); break;
            case 6: f_6(); break;
            case 7: f_7(); break;
            case 8: f_8(); break;
            case 9: f_9(); break;
            default: file_read(); }
    } // func_seletor()



    function esc(){
        if(end_open==0){
            end_open=1;
            end_work(); }
        else{
            end_open=0;
            end_work(); }}

    function f_1(){
        if(f_mode==1){
            f_mode=4; }
        else{
            f_mode=1; }
        svg_arrange();
        disp_result();
        count_c(); }

    function f_2(){
        if(f_mode==2){
            f_mode=4; }
        else{
            f_mode=2; }
        svg_arrange();
        disp_result();
        count_c(); }

    function f_3(){
        if(f_mode==3){
            f_mode=4; }
        else{
            f_mode=3; }
        svg_arrange();
        disp_result();
        count_c(); }

    function f_4(){
        if(size_mode==0){
            size_mode=1;
            if(f_mode==0){
                f_mode=4; }
            svg_arrange();
            disp_result();
            disp_size_mode();
            count_c(); }
        else{
            size_mode=0;
            svg_arrange();
            disp_size_mode();
            count_c(); }}

    function f_5(){
        if(attr_mode==0){
            attr_mode=1;
            if(f_mode==0){
                f_mode=4; }
            svg_arrange();
            disp_result();
            disp_attr_mode();
            count_c(); }
        else{
            attr_mode=0;
            svg_arrange();
            disp_attr_mode();
            count_c(); }}

    function f_6(){
        if(stroke_mode==0){
            stroke_mode=1;
            if(f_mode==0){
                f_mode=4; }
            svg_arrange();
            disp_result();
            disp_stroke_mode();
            count_c(); }
        else{
            stroke_mode=0;
            svg_arrange();
            disp_stroke_mode();
            count_c(); }}

    function f_7(){
        if(style_mode==0){
            style_mode=1;
            if(f_mode==0){
                f_mode=4; }
            svg_arrange();
            disp_result();
            disp_style_mode();
            count_c(); }
        else{
            style_mode=0;
            svg_arrange();
            disp_style_mode();
            count_c(); }}

    function f_8(){
        if(output_open==0){
            output_open=1;
            output_disp(); }
        else if(output_open==1){
            output_open=2;
            output_disp(); }
        else{
            output_open=0;
            output_disp(); }}

    function f_9(){
        if(mag_view==0){
            mag_view=1;
            disp_mag_mode();
            mag_fit(); }
        else{
            mag_view=0;
            disp_mag_mode();
            mag_fit(); }}



    function mag_fit(){
        if(mag_view==1){
            let view_div=document.querySelector('.or');
            let width_or=view_div.getBoundingClientRect().width;

            let style=
                '<style class="mag">.source svg { '+
                'width: '+ width_or +'px !important; height: auto !important; }</style>';
            document.body.insertAdjacentHTML('beforeend', style); }
        else{
            if(document.querySelector('.mag')){
                document.querySelector('.mag').remove(); }}
    } // mag_fit()



    function set_svg(img){
        let view_div=document.querySelector('.or');
        if(view_div){
            view_div.innerHTML=img;
            let svg_img=document.querySelector('.or svg');
            viewbox_add(svg_img); }

        function viewbox_add(Svg){ // viewBox属性を追加
            let viewbox=Svg.getAttribute("viewBox");
            let width=Svg.getAttribute("width");
            let height=Svg.getAttribute("height");
            if(!viewbox && height && width){
                let value='0 0 '+ width +' '+ height;
                Svg.setAttribute("viewBox", value); } // viewBox属性を追加

            Svg.removeAttribute("x"); // x値属性を削除
            Svg.removeAttribute("y"); } // x値属性を削除
    } // set_svg()



    function file_read(){
        disp_reset();

        let svg_ne=document.querySelector('.ne svg');
        if(svg_ne){
            svg_ne.remove(); } // 前処理のsvgを削除

        let p_count=document.querySelector('.p_count');
        if(p_count){
            p_count.textContent='　'; } // 前処理の文字数カウントをリセット

        let file_input=document.querySelector('.file_input');
        if(file_input){
            file_input.click();

            file_input.addEventListener('change' , function(){
                if(!(file_input.value)) return; // ファイルが選択されない場合
                let file_list=file_input.files;
                if(!file_list) return; // ファイルリストが選択されない場合
                let file=file_list[0];
                if(!file) return; // ファイルが無い場合

                if(file.name.split('.').pop()=='svg'){ // ファイル名の確認
                    let file_reader=new FileReader();
                    file_reader.readAsText(file);
                    file_reader.onload=function(){
                        let data_in=file_reader.result;
                        set_svg(data_in); }}
                else{
                    alert(
                        "❌　扱えるファイルではありません\n"+
                        "　　 扱えるファイルは「.svg」ファイルです"); }}); }
    } // file_read()



    function svg_arrange(){
        dot2=0; // 💢
        dot3=0; // 💢

        let svg_or;
        let path_or;
        let svg_ne

        svg_or=document.querySelector('.or svg'); // 処理元のSVG
        let ne=document.querySelector('.ne');

        if(!svg_or || !ne){ // 元画像が無い場合は 処理表示を抑止する
            f_mode=0;
            attr_mode=0;
            stroke_mode=0;
            style_mode=0; }

        else if(svg_or && ne){ // 元のSVG画像が無いと動作しない
            if(ne.querySelector('svg')){
                ne.querySelector('svg').remove(); }
            svg_ne=svg_or.cloneNode(true);
            ne.appendChild(svg_ne);



            if(size_mode==1){
                size_off(svg_ne); } // attr属性削除を実行

            if(attr_mode==1){
                beautify(svg_ne); } // attr属性削除を実行

            if(stroke_mode==1){
                stroke_off(svg_ne); } // stroke属性削除を実行

            if(style_mode==1){
                style_off(svg_ne); } // style属性削除を実行


            path_or=svg_ne.querySelectorAll('path'); // 処理対象のSVGの全てのpath
            for(let k=0; k<path_or.length; k++){
                let d_or=path_or[k].getAttribute("d");
                path_or[k].setAttribute("d", path_trim(d_or)); }

            function path_trim(D_or){ // d属性の加工
                let d_all=[];
                if(select_type(D_or)){
                    d_all=D_or.split(','); } // カンマ区切りの処理
                else{
                    d_all=D_or.split(' '); } // スペース区切りの処理

                if(f_mode<5){
                    let temp_d;
                    temp_d=d_all.join(' '); // 全てスペース区切りに戻す
                    if(f_mode==4){
                        return temp_d; } // 数値処理なしで出力
                    else{
                        return arrange_i_code(temp_d); }}


                function select_type(DD_or){
                    let regex=/,/;
                    return regex.test(DD_or); } // カンマ有り true / 無し false


                function arrange_i_code(Temp_d){ // path全体の処理
                    let c_count=0; // 数として処理した文字数
                    let i_code=[]; // 全pathを1文字ずつにした配列
                    let i_code_new=[]; // 処理後の数と文字を格納する配列

                    i_code=Temp_d.split(''); // pathの全体を文字1個ずつに分解
                    for(let k=0; k<i_code.length; k++){
                        if(i_code[k].match(/[A-Za-z]| |-/g)){
                            if(c_count==0){
                                i_code_new.push(i_code[k]); }
                            else{
                                i_code_new.push(arr_i_code(c_count, k));
                                c_count=0; }}
                        else{ // 数字または「.」の場合
                            c_count+=1; }}

                    return i_code_new.join(''); // 処理後のpath


                    function arr_i_code(Count, K){
                        let tmp=[];
                        let tmp_num; // 再構成した数値（小数を含む）
                        let tmp_round; // 四捨五入した数値
                        for(let i=0; i<Count; i++){
                            tmp.push(i_code[K-Count+i]); }


                        if(count_dot(tmp)<2){ //「.」が1個以内
                            if(count_dot(tmp)==1){
                                tmp_num=parseFloat(tmp.join(''));
                                if(f_mode==2 || f_mode==3){
                                    if(tmp_num>=10 && f_mode==2){ // 🌐
                                        tmp_round=Math.round(tmp_num); }
                                    else{
                                        tmp_round=(Math.round(tmp_num*10))/10; }}
                                else{
                                    tmp_round=Math.round(tmp_num); }}
                            else if(count_dot(tmp)==0){
                                tmp_round=parseInt(tmp.join('')); }

                            return tmp_round.toString()+i_code[K]; }


                        else if(count_dot(tmp)==2){ //「.」が2個
                            dot2+=1; // 💢
                            let sub_count=0;
                            let sub_tmp1=[];
                            let sub_tmp2=[];
                            let tmp_num1;
                            let tmp_num2;
                            let r_tmp_num2;

                            for(let i=0; i<tmp.length; i++){
                                if(sub_count==0){
                                    sub_tmp1.push(tmp[i]);
                                    if(tmp[i]=="."){
                                        sub_count=1; }}
                                else if(sub_count==1){
                                    if(tmp[i]!="."){
                                        sub_tmp1.push(tmp[i]); }
                                    if(tmp[i]=="."){
                                        sub_count=2;
                                        sub_tmp2.push(tmp[i]); }}
                                else{
                                    sub_tmp2.push(tmp[i]); }}

                            tmp_num1=parseFloat(sub_tmp1.join(''));
                            tmp_num2=parseFloat(sub_tmp2.join(''));
                            r_tmp_num2=(Math.round(tmp_num2*10))/10;

                            if(f_mode==2 || f_mode==3){
                                if(r_tmp_num2<1 && r_tmp_num2!=0){
                                    if(tmp_num1>=10 && f_mode==2){ // 🌐
                                        return (Math.round(tmp_num1)).toString()+
                                            ' '+r_tmp_num2.toString().slice(1)+
                                            i_code[K]; }
                                    else{
                                        return ((Math.round(tmp_num1*10))/10).toString()+
                                            ' '+r_tmp_num2.toString().slice(1)+
                                            i_code[K]; }}
                                else if(r_tmp_num2==0){
                                    if(tmp_num1>=10 && f_mode==2){ // 🌐
                                        return (Math.round(tmp_num1)).toString()+
                                            ' 0'+i_code[K]; }
                                    else{
                                        return ((Math.round(tmp_num1*10))/10).toString()+
                                            ' 0'+i_code[K]; }}
                                else{
                                    if(tmp_num1>10 && f_mode==2){ // 🌐
                                        return (Math.round(tmp_num1)).toString()+
                                            ' 1'+i_code[K]; }
                                    else{
                                        return ((Math.round(tmp_num1*10))/10).toString()+
                                            ' 1'+i_code[K]; }}}

                            else{
                                if(r_tmp_num2<1 && r_tmp_num2!=0){
                                    return (Math.round(tmp_num1)).toString()+
                                        ' '+r_tmp_num2.toString().slice(1)+
                                        i_code[K]; }
                                else if(r_tmp_num2==0){
                                    return (Math.round(tmp_num1)).toString()+
                                        ' 0'+i_code[K]; }
                                else{
                                    return (Math.round(tmp_num1)).toString()+
                                        ' 1'+i_code[K]; }}} // 桁上がりして1.0になる

                        else{ //「.」が3個以上
                            dot3+=1; // 💢
                            return tmp.join('')+i_code[K]; }


                        function count_dot(arr){
                            let count=0;
                            arr.forEach(function(item){
                                if(item=='.'){
                                    count+=1; }});
                            return count; }

                    } // arr_i_code
                } // arrange_i_code()
            } // path_trim
        }} // svg_arrange()



    function size_off(Svg){
        Svg.removeAttribute("width"); // width属性を削除
        Svg.removeAttribute("height"); // height属性を削除
    } // size_off()



    function beautify(Svg){
        Svg.removeAttribute("xmlns"); // xmlns属性を削除
        Svg.removeAttribute("xml:space"); // xml:space属性を削除
        Svg.removeAttribute("xmlns:xlink"); // xmlns:xlink属性を削除
        Svg.removeAttribute("version"); // version属性を削除
        Svg.removeAttribute("id"); // version属性を削除
        Svg.removeAttribute("class"); // version属性を削除
    } // beautify()



    function stroke_off(Svg){
        let path_or=Svg.querySelectorAll('path'); // 処理元のSVGの全てのpath
        for(let k=0; k<path_or.length; k++){
            let style_or=path_or[k].getAttribute("style");
            if(style_or){
                path_or[k].style.stroke=''; }}
    } // stroke_off()



    function style_off(Svg){
        Svg.removeAttribute("style"); // style属性を削除
    } // style_off()



    function count_c(){
        let svg1_c=0;
        let svg2_c=0;
        let svg_all=document.querySelectorAll('.source svg');
        if(svg_all[0] && svg_all[1]){ // 画像が無い場合は動作しない
            svg1_c=svg_all[0].outerHTML.length;
            svg2_c=svg_all[1].outerHTML.length;
            let p_count=document.querySelector('.p_count');
            if(p_count){
                p_count.innerHTML='文字数　<b>'+svg1_c+'</b> ▷ <b>'+svg2_c+'</b>'; }

            output_open=0; // コード出力パネルを閉じる
            output_disp(); }
    } // count_c()



    function disp_size_mode(){
        let p_size=document.querySelector('.p_size .nf');
        if(p_size){
            if(size_mode==1){
                p_size.textContent='🔴';
                p_size.style.opacity='1'; }
            else{
                p_size.textContent='⚪';
                p_size.style.opacity='.2'; }}}


    function disp_attr_mode(){
        let p_attr=document.querySelector('.p_attr .nf');
        if(p_attr){
            if(attr_mode==1){
                p_attr.textContent='🔴';
                p_attr.style.opacity='1'; }
            else{
                p_attr.textContent='⚪';
                p_attr.style.opacity='.2'; }}}


    function disp_stroke_mode(){
        let p_stroke=document.querySelector('.p_stroke .nf');
        if(p_stroke){
            if(stroke_mode==1){
                p_stroke.textContent='🔴';
                p_stroke.style.opacity='1'; }
            else{
                p_stroke.textContent='⚪';
                p_stroke.style.opacity='.2'; }}}


    function disp_style_mode(){
        let p_style=document.querySelector('.p_style .nf');
        if(p_style){
            if(style_mode==1){
                p_style.textContent='🔴';
                p_style.style.opacity='1'; }
            else{
                p_style.textContent='⚪';
                p_style.style.opacity='.2'; }}}


    function disp_mag_mode(){
        let p_mag=document.querySelector('.f_9 .nf');
        if(p_mag){
            if(mag_view==1){
                p_mag.style.opacity='1'; }
            else{
                p_mag.style.opacity='.2'; }}}



    function disp_result_plus(){
        let plus=document.querySelector('.ne_panel .plus');
        let detail=document.querySelector('.ne_panel .detail');
        let compress=document.querySelector('.p_compress');
        let size=document.querySelector('.p_size');
        let attr=document.querySelector('.p_attr');
        let stroke=document.querySelector('.p_stroke');
        let style=document.querySelector('.p_style');
        if(plus && detail){
            fade_con(compress);
            fade_con(size);
            fade_con(attr);
            fade_con(stroke);
            fade_con(style);

            function fade_con(property){
                if(property){
                    property.onmouseover=()=>{
                        plus.textContent=select(property);
                        plus.classList.add('fade_in');
                        plus.classList.remove('fade_out');
                        detail.classList.add('fade_out');
                        detail.classList.remove('fade_in'); }
                    property.onmouseleave=()=>{
                        plus.classList.add('fade_out');
                        plus.classList.remove('fade_in');
                        detail.classList.add('fade_in');
                        detail.classList.remove('fade_out'); }}

                function select(proper){
                    switch (proper){
                        case size:
                            return 'width・height属性を削除';
                            break;
                        case attr:
                            return '不要な属性指定を削除';
                            break;
                        case stroke:
                            return 'Stroke の指定を削除';
                            break;
                        case style:
                            return 'インラインのStyle指定を削除';
                            break;
                        default:
                            return 'pathコード文字数の圧縮レベル'; }}}
        }} // disp_result_plus()



    function disp_result(){
        let nf_comp=document.querySelectorAll('.p_compress .nf');
        for(let k=0; k<nf_comp.length; k++){
            if(f_mode==(k+1)){
                nf_comp[k].textContent='🔴';
                nf_comp[k].style.opacity='1'; }
            else{
                nf_comp[k].textContent='⚪';
                nf_comp[k].style.opacity='.2'; }}

        let detail=document.querySelector('.ne_panel .detail');
        if(detail){
            let mode_text;
            if(f_mode==0){
                mode_text='　'; }
            if(f_mode==1){
                mode_text='<tt>S：通常の四捨五入</tt>'+
                    '<t>Dot2 </t>'+dot2 +' <t>Dot3 </t>'+dot3; }
            else if(f_mode==2){
                mode_text='<tt>M：10以下を小数第1位出力</tt>'+
                    '<t>Dot2 </t>'+dot2 +' <t>Dot3 </t>'+dot3; }
            else if(f_mode==3){
                mode_text='<tt>L：全数を小数第1位出力</tt>'+
                    '<t>Dot2 </t>'+dot2 +' <t>Dot3 </t>'+dot3; }
            else if(f_mode==4){
                mode_text='<tt>Default：圧縮処理なし</tt>'; }
            detail.innerHTML=mode_text; }
    } // disp_result()



    function disp_reset(){
        size_mode=0;
        disp_size_mode();
        attr_mode=0;
        disp_attr_mode();
        stroke_mode=0;
        disp_stroke_mode();
        style_mode=0;
        disp_style_mode();
        mag_view=0;
        disp_mag_mode();
        mag_fit();
        f_mode=0;
        disp_result();
        output_open=0;
        output_disp();
    } // disp_reset()



    function help_link(){
        let help_svg=document.querySelector('#help .help_svg');
        if(help_svg){
            let help_url='https://ameblo.jp/personwritep/entry-12794615989.html';
            help_svg.setAttribute('href', help_url);
            help_svg.setAttribute('target', '_blank'); }}



    function output(Svg){
        let svgString=Svg.outerHTML;

        let stack=[];
        findText(svgString); // タグ記号で区切る

        for(let k=0; k<stack.length; k++){ // pathタグは入れ子にならないので纏める
            if(stack[k].startsWith('<path') && stack[k+1]=='</path>'){
                stack[k] +='</path>';
                stack[k+1]=''; }}

        stack=stack.filter(item=>{
            return item!=''; });

        for(let k=0; k<stack.length; k++){ // row_countの文字ずつの行に区切る
            stack[k]=break_words(stack[k]); }

        return stack.join('\n').slice(0, -1) +';'; // 繋いで末尾の「+」を「;」に変更


        function findText(text){
            for(let index=0; true;){
                let s=text.indexOf('<', index); // index位置から検索
                if(s==-1){ break; } // '<' を見つけたら後方の処理へ
                let e=text.indexOf('>', s +1); // 発見した位置より後方の'>'を検索
                if(e==-1){ break; } // '>' を見つけたら後方の処理へ
                stack.push('<'+ text.substring(s +1, e) +'>'); // s e の位置を切出す
                index=e +1; }
            return stack; }

        function break_words(source_code){
            let s_arr=[];
            for (let i=0; i<source_code.length; i+=row_count){ // コード1行の文字数の指定
                s_arr.push(source_code.slice(i, i+row_count)); }

            let new_s_arr=[];
            for (let i=0; i<s_arr.length; i++){
                let row="'"+ s_arr[i] +"'+";
                new_s_arr.push(row); }

            return new_s_arr.join('\n'); }
    } // output()



    function outpanel_set(Svg){
        if(output_open==1){
            let row_n=document.querySelector('.row_n');
            if(row_n){
                row_n.value=row_count;
                row_n.onchange=function(){
                    edit_row(row_n.value*1); }}

            function edit_row(row_set){
                if(19<row_set && row_set<201){ // 文字数は 20～ 200
                    row_count=row_set;
                    localStorage.setItem('SSVG', row_count);
                    let SSVG_pre=document.querySelector('.output_SSVG pre');
                    if(SSVG_pre){
                        SSVG_pre.textContent=output(Svg); }}}

            window.addEventListener('keydown', (event)=>{ // ⇧⇩キーで inputにフォーカス
                if(output_open==1){
                    if(event.keyCode==40 || event.keyCode==38){
                        let row_n=document.querySelector('.row_n');
                        if(row_n){
                            row_n.focus(); }}}}); }


        let out_copy=document.querySelector('.out_copy');
        if(out_copy){
            out_copy.onclick=function(){
                if(output_open==1){
                    copyToClipboard(output(Svg)); }
                else if(output_open==2){
                    let str=Svg.outerHTML.replace(/\r?\n/g, ''); // 改行削除
                    copyToClipboard(str); }}

            function copyToClipboard(value){
                if(navigator.clipboard){ // navigator.clipboardが使えるか判定する
                    return navigator.clipboard.writeText(value).then(function(){ // コピー
                        out_copy.style.boxShadow='inset 0 0 0 20px #2196f350';
                        out_copy.style.outline='2px solid #fff';
                        setTimeout(()=>{
                            out_copy.style.boxShadow='';
                            out_copy.style.outline='';
                        }, 1000);
                    }); }}}
    } // outpanel_set()



    function output_disp(){
        if(output_open==1){
            let Svg=document.querySelector('.ne svg');
            if(Svg){
                let panel=
                    '<div class="output_SSVG">'+
                    '<div class="out_control">'+
                    '<span>1行の文字数の指定： '+
                    '<input class="row_n" type="number" min="20" max="200"></span>　　'+
                    'クリップボードに： <input class="out_copy" type="submit" value="Copy">'+
                    '　　<input class="outpanel_close" type="submit" value="✖">'+
                    '</div>'+
                    '<pre></pre>'+
                    '<style>'+
                    '.output_SSVG { position: relative; top: 160px; margin: 0 auto;'+
                    'font: normal 16px/20px Meiryo; width: fit-content; min-width: 600px; '+
                    'background: #fff; border: 2px solid #2196f3; z-index: 4; } '+
                    '.output_SSVG .out_control { padding: 6px 0 5px; text-align: center; '+
                    'border-top: 1px solid #333; border-bottom: 1px solid #333; '+
                    'background: #c7e5fc; } '+
                    '.output_SSVG .out_control input { font: normal 16px/24px Meiryo; } '+
                    '.row_n { width: 45px; padding: 2px 4px 0 12px; vertical-align: -1px; } '+
                    '.outpanel_close { position: absolute; right: 25px; } '+
                    '.output_SSVG pre, .output_SSVG .cord_div { '+
                    'font: normal 16px/20px Meiryo; margin: 0; padding: 30px 20px 30px 30px; '+
                    'max-height: calc(100vh - 340px); overflow-y: scroll; } '+
                    '.output_SSVG .cord_div '+
                    '{ width: 720px; min-width: 600px; resize: horizontal; } '+
                    '</style></div>';

                if(!document.querySelector('.output_SSVG')){
                    document.body.insertAdjacentHTML('beforeend', panel); }

                let SSVG_pre=document.querySelector('.output_SSVG pre');
                if(SSVG_pre){
                    SSVG_pre.textContent=output(Svg); }

                outpanel_set(Svg);

                let outpanel_close=document.querySelector('.outpanel_close');
                if(outpanel_close){
                    outpanel_close.onclick=()=>{
                        close_output();
                        output_open=0; }}}}

        else if(output_open==2){
            let Svg=document.querySelector('.ne svg');
            if(Svg){
                let out_control_span=document.querySelector('.out_control span');
                if(out_control_span){
                    out_control_span.textContent='改行のないSVGコードを出力'; }
                let SSVG=document.querySelector('.output_SSVG');
                let SSVG_pre=SSVG.querySelector('pre');
                if(SSVG_pre){
                    SSVG_pre.remove(); }
                if(SSVG){
                    let cord_div='<div class="cord_div"></div>';
                    SSVG.insertAdjacentHTML('beforeend', cord_div);

                    let SSVG_div=document.querySelector('.output_SSVG .cord_div');
                    if(SSVG_div){
                        SSVG_div.textContent=Svg.outerHTML; }

                    outpanel_set(Svg);

                    let outpanel_close=document.querySelector('.outpanel_close');
                    if(outpanel_close){
                        outpanel_close.onclick=()=>{
                            close_output();
                            output_open=0; }}}}}

        else if(output_open==0){
            close_output(); }
    } // output_disp()



    function close_output(){
        if(document.querySelector('.output_SSVG')){
            document.querySelector('.output_SSVG').remove(); }}



    function end_work(){
        if(end_open==1){
            let panel=
                '<div class="alert_SSVG">'+
                '<p>このウインドウを閉じますが、｢F10」の待受け機能は全ての画面</p>'+
                '<p>で動作をし続けます。　 SVG画像の処理を終了する場合は、必ず</p>'+
                '<p>Tampermonkey のダッシュボードで Simple SVG を「OFF」</P>'+
                '<p>にしてください。</p>'+
                '<p class="alert_cont">'+
                '<input class="close_win" type="submit" value="ウインドウを閉じる">　'+
                '<input class="cancel_win" type="submit" value="キャンセル"></p>'+
                '<style>.alert_SSVG { position: fixed; top: 160px; left: calc(50% - 380px); '+
                'font: bold 20px/20px Meiryo; z-index: 5; padding: 20px 30px; '+
                'color: #fff; background: #455A64; border: 4px solid #2196f3; } '+
                '.alert_cont { text-align: right; padding-right: 50px; } '+
                '.alert_SSVG input { font: normal 16px Meiryo; padding: 3px 6px 2px; } '+
                '</style></div>';

            if(!document.querySelector('.alert_SSVG')){
                document.body.insertAdjacentHTML('beforeend', panel); }

            document.querySelector('.close_win').onclick=()=>{
                window.close(); }

            document.querySelector('.cancel_win').onclick=()=>{
                end_open=0;
                document.querySelector('.alert_SSVG').remove(); }}

        else if(end_open==0){
            if(document.querySelector('.alert_SSVG')){
                document.querySelector('.alert_SSVG').remove(); }}
    } // end_work()

} // main()
