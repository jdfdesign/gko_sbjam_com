WYMeditor.SKINS.gko={init:function(a){$(a._box).find(a._options.toolsSelector).addClass("wym_buttons"),$(a._box).find("div.wym_area_right ul").parents("div.wym_area_right").show().parents(a._options.boxSelector).find("div.wym_area_main").css({"margin-right":"155px"}),$(a._box).find("div.wym_area_left ul").parents("div.wym_area_left").show().parents(a._options.boxSelector).find("div.wym_area_main").css({"margin-left":"155px"}),$(a._box).find(".wym_section").hover(function(){$(this).addClass("hover")},function(){$(this).removeClass("hover")}),$(a._box).find(".wym_tools_class").hover($.proxy(function(){this.toggleClassSelector()},a),$.proxy(function(){this.toggleClassSelector()},a)),$(".wym_skin_gko").animate({opacity:1},800)}}