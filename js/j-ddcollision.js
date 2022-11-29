/*!
 * ddcollision - jQuery Plugin
 * version: 1.0.0 (November 2022)
 * @requires jQuery
 *
 * Examples at /
 *
 * Developed By Joby AJ 
 *
 */



const jddc = {
    init: (jddcObj) => {
        var jddcObj = {
            parent: jddcObj?.parent ? jddcObj?.parent : 'j-ddc-wrap',
            resize: jddcObj?.resize && typeof (jddcObj?.resize) === 'boolean' ? jddcObj?.resize : false,
            selector: jddcObj?.selector ? jddcObj?.selector : 'j-ddc-ele',
            overlapClass: jddcObj?.overlapClass ? jddcObj?.overlapClass : 'j-ddc-overlap',
            collisionClass: jddcObj?.collisionClass ? jddcObj?.collisionClass : 'j-ddc-collision',
            minSize: jddcObj?.minSize ? jddcObj?.minSize : 10,
            collisionMessage: jddcObj?.collisionMessage ? jddcObj?.collisionMessage : 'please arrange the block',
            ruler: jddcObj?.ruler && typeof (jddcObj?.ruler) === 'boolean' ? jddcObj?.ruler : false,
        }

        jddc.dragdrop(jddcObj);
    },

    dragdrop: (jddcObj) => {

        $(`.${jddcObj.selector}`).draggable({
            containment: 'parent',
            refreshPositions: true,
            scroll: false,
            stack: `.${jddcObj.parent}`,
            // cancel: "input,textarea, button,select,option",
            grid: [1, 1],
            // zIndex: 100,
            snap: `.j-ddc-ruler-h-l , .j-ddc-ruler-h-r, .${jddcObj.selector}`,
            snapMode: "outer",
            snapTolerance: 4,
            create: function (event, ui) {
            },
            start: function (event, ui) {
            },
            drag: function (event, ui) {
                jddc.collisionHandler($(this), jddcObj);
                jddcObj.ruler && jddc.dragRuler($(this));
            },
            stop: function (event, ui) {
                jddcObj.ruler && jddc.dragRulerStoper();
            }
        });

        jddcObj?.resize && jddc.resize(jddcObj);
    },

    resize: (jddcObj) => {

        $(`.${jddcObj.selector}`).resizable({
            enable: true,
            containment: 'parent',
            minWidth: jddcObj.minSize,

            start: function (event, ui) {
            },
            resize: function (event, ui) {
                jddc.collisionHandler($(this), jddcObj);
                jddcObj.ruler &&   jddc.dragRuler($(this));
            },
            stop: function (event, ui) {
                jddcObj.ruler && jddc.dragRulerStoper();
                $(this).css({
                    "height": $(this).outerHeight()
                });
            }
        });
    },

    collisionHandler: (element, jddcObj) => {

        $(this).removeClass(jddcObj.collisionClass);
        var collision_return = jddc.elemCollision(element, '', jddcObj);

        var collision_val = collision_return[0];
        var collision_element = collision_return[1];

        var element_attr = element.find('.input_field').attr('data-element');
        var collapse = element.parents(`.${jddcObj.parent}`).find(`.${jddcObj.overlapClass}`);
        // var collision_indicator = $('.test').clone();
        var element_siblings = element.siblings(`.${jddcObj.selector}`);
        var element_siblings_selected = element.siblings(`.${jddcObj.selector}[data-jddc-${element_attr}="true"]`);


        // when collison happens
        if (collision_val == 1) {

            element_siblings_selected.each(function () {

                var this_selector1 = $(this);
                var this_data = $(this).find('.input_field').attr('data-element');
                element.attr('data-jddc-' + this_data, true);

                var collapsed_return = jddc.elemCollision(this_selector1, '', jddcObj);

                if (collapsed_return[0] == 0) {
                    this_selector1.removeClass(`ui-resizable-resizing , ${jddcObj.overlapClass}`);
                    this_selector1.removeAttr('data-jddc-' + element_attr);
                    element.removeAttr('data-jddc-' + this_data);
                    // this_selector1.find('.collision_icon').remove();
                }

                if (collapsed_return[0] == 1) {
                    jddc.elemCollision(element, element_attr, jddcObj);
                }

            });

            element.addClass(`${jddcObj.collisionClass}`);
        }

        // element is free from collision
        if (collision_val == 0) {

            element_siblings_selected.each(function () {
                var this_selector1 = $(this);
                var this_data = $(this).find('.input_field').attr('data-element');
                var collapsed_return = jddc.elemCollision(this_selector1, '', jddcObj);

                if (collapsed_return[0] == 0) {
                    this_selector1.find('.collision_icon').remove();
                    this_selector1.removeClass(`ui-resizable-resizing , ${jddcObj.collisionClass}`);
                    this_selector1.removeClass(`${jddcObj.overlapClass}`);
                }

                this_selector1.removeAttr('data-jddc-' + element_attr);
                element.removeAttr('data-jddc-' + this_data);

            });

            element.removeClass(`ui-resizable-resizing , ${jddcObj.overlapClass} , ${jddcObj.collisionClass}`);

        }

        // collision indicator
        // if (element.hasClass('j-ddc-collision') || element.find('.overflow_indicator').length == 1) {
        //     if (element.find('.collision_icon').length = 1) {
        //         element.find('.collision_icon').remove();
        //         element.append(collision_indicator);
        //     } else {
        //         element.append(collision_indicator);
        //     }
        // } else {
        //     element.find('.collision_icon').remove();
        // }
    },

    elemCollision: (element, element_attr, jddcObj) => {

        var this_selector = element;
        var this_position = this_selector.position();
        var this_left = parseInt(this_position.left);
        var this_top = parseInt(this_position.top);
        var this_width = parseInt(this_selector.outerWidth());
        var this_height = parseInt(this_selector.outerHeight());
        var this_width_left = this_width + this_left;
        var this_height_top = this_height + this_top;
        var return_val = 0;
        var this_ele;
        var this_selector_attr = element.find('.input_field').attr('data-element');
        var element_siblings_selected = element.siblings('.j-ddc-ele[data-jddc-' + element_attr + '="true"]');

        // for the collapse txt viewer
        // also sets the position
        if (!element_attr) {

            // console.log(`.${jddcObj.parent} .${jddcObj.selector}`)
            $(`.${jddcObj.parent} .${jddcObj.selector}`).not(this_selector).each(function (index, el) {

                var item_span = $(this);
                var item_position = item_span.position();
                var item_left = parseInt(item_position.left);
                var item_top = parseInt(item_position.top);
                var item_width = parseInt(item_span.outerWidth());
                var item_height = parseInt(item_span.outerHeight());
                var item_width_left = item_width + item_left;
                var item_height_top = item_height + item_top;

                $(this).removeClass(jddcObj.collisionClass);

                if (this_left < item_left && this_width_left > item_left && this_top < item_top && this_height_top > item_top ||
                    this_left > item_left && this_left < item_width_left && this_top < item_top && this_height_top > item_top ||
                    this_left < item_left && this_width_left > item_left && this_top > item_top && this_top < item_height_top ||
                    this_left > item_left && this_left < item_width_left && this_top > item_top && this_top < item_height_top ||
                    this_top == item_top && this_left > item_left && item_width_left > this_left ||
                    this_top == item_top && this_left < item_left && this_width_left > item_left ||
                    this_left == item_left && this_top > item_top && this_top < item_height_top ||
                    this_left == item_left && this_top < item_top && this_height_top > item_top) {

                    $(this).addClass('ui-resizable-resizing');
                    $(this).addClass(jddcObj.overlapClass);
                    $(this).attr('data-jddc-' + this_selector_attr, true);

                    this_ele = $(this);
                    return_val = 1;

                } else {
                    // $(this).removeClass('ui-resizable-resizing');
                    // $(this).removeClass('j-ddc-overlap');
                }
            });
            return [return_val, this_ele];

        } else {

            element_siblings_selected.each(function () {

                var item_span = $(this);
                var item_position = item_span.position();
                var item_left = parseInt(item_position.left);
                var item_top = parseInt(item_position.top);
                var item_width = parseInt(item_span.outerWidth());
                var item_height = parseInt(item_span.outerHeight());
                var item_width_left = item_width + item_left;
                var item_height_top = item_height + item_top;
                var this_selector_attr_1 = item_span.find('.input_field').attr('data-element');

                if (this_left < item_left && this_width_left > item_left && this_top < item_top && this_height_top > item_top ||
                    this_left > item_left && this_left < item_width_left && this_top < item_top && this_height_top > item_top ||
                    this_left < item_left && this_width_left > item_left && this_top > item_top && this_top < item_height_top ||
                    this_left > item_left && this_left < item_width_left && this_top > item_top && this_top < item_height_top ||
                    this_top == item_top && this_left > item_left && item_width_left > this_left ||
                    this_top == item_top && this_left < item_left && this_width_left > item_left ||
                    this_left == item_left && this_top > item_top && this_top < item_height_top ||
                    this_left == item_left && this_top < item_top && this_height_top > item_top) {

                } else {
                    item_span.removeAttr('data-jddc-' + this_selector_attr);
                    this_selector.removeAttr('data-jddc-' + this_selector_attr_1);
                }

            });
        }
    },

    dragRuler: (element) => {
        jddc.dragRulerActive(element);
    },

    dragRulerActive: (element) => {
        var element_left = parseInt(element.position().left);
        var element_top = parseInt(element.position().top);
        var element_width = parseInt((element.outerWidth()) + element_left);
        var element_height = parseInt((element.outerHeight()) + element_top);
        var count = 0;
        var position_array = [];

        $('.j-ddc-ruler-h-l').css({
            "left": element_left
        }).hide();

        $('.j-ddc-ruler-h-r').css({
            "left": element_width
        }).hide();

        $('.j-ddc-ruler-v-t').css({
            "top": element_top
        }).hide();

        $('.j-ddc-ruler-v-b').css({
            "top": element_height
        }).hide();


        position_array = jddc.dragRulerArray(element);

        while (count < position_array.length) {

            if (position_array[count].siblings_left >= element_left - 1 && position_array[count].siblings_left <= element_left + 1 ||
                position_array[count].siblings_left_width >= element_left - 1 && position_array[count].siblings_left_width <= element_left + 1) {
                $('.j-ddc-ruler-h-l').show();
            }

            if (position_array[count].siblings_left_width >= element_width - 1 && position_array[count].siblings_left_width <= element_width + 1 ||
                position_array[count].siblings_left >= element_width - 1 && position_array[count].siblings_left <= element_width + 1) {
                $('.j-ddc-ruler-h-r').show();
            }

            if (position_array[count].siblings_top >= element_top - 1 && position_array[count].siblings_top <= element_top + 1 ||
                position_array[count].siblings_top_height >= element_top - 1 && position_array[count].siblings_top_height <= element_top + 1) {
                $('.j-ddc-ruler-v-t').show();
            }

            if (position_array[count].siblings_top_height >= element_height - 1 && position_array[count].siblings_top_height <= element_height + 1 ||
                position_array[count].siblings_top >= element_height - 1 && position_array[count].siblings_top <= element_height + 1) {
                $('.j-ddc-ruler-v-b').show();
            }

            count++;
        }
    },

    dragRulerArray: (element) => {
        var element_top = parseInt(element.position().top);
        var element_height = parseInt(element.outerHeight());
        var element_top_height = element_top + element_height;
        var element_siblings = element.siblings();

        var value_storing = [];

        element_siblings.each(function () {
            var siblings_left = parseInt($(this).position().left);
            var siblings_top = parseInt($(this).position().top);
            var siblings_width = parseInt($(this).outerWidth());
            var siblings_height = parseInt($(this).outerHeight());
            var siblings_left_width = parseInt(siblings_width + siblings_left);
            var siblings_top_height = parseInt(siblings_height + siblings_top);
            var siblings_selector = $(this).find('.input_field').attr('data-editbox');
            var gap_val, gap_val_last;

            if (element_top >= siblings_top_height) {
                gap_val = element_top - siblings_top_height;
            } else {
                gap_val = siblings_top - element_top_height;
            }

            if (gap_val >= 0) {
                gap_val_last = gap_val;
            }

            value_storing.push({
                'siblings_selector': siblings_selector,
                'siblings_left': siblings_left,
                'siblings_top': siblings_top,
                'siblings_width': siblings_width,
                'siblings_height': siblings_height,
                'siblings_left_width': siblings_left_width,
                'siblings_top_height': siblings_top_height,
                'siblings_element_gap': gap_val_last
            });
        });

        return value_storing;
    },

    dragRulerStoper: () => {
        $('.j-ddc-ruler-h-l , .j-ddc-ruler-h-r , .j-ddc-ruler-v-t , .j-ddc-ruler-v-b').hide();
    },
}