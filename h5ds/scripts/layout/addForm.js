/**
 *
 */
 define(function(require,exports,module){
    var Widget     = require( 'widget' ),
        Handlebars = require( 'handlebars' );
    
    var Form       = Widget.extend({
        attrs: {
            trigger: '#addFormBtn',
            element: '<div class="popBox" id="addFormPopBox"><div class="dialog-title"><label class="titleTag"></label><i class="closeMe" title="关闭">&times;</i></div><div class="dialogContent"><div class="setForm">action:<input type="text"> target:<select><option value="">默认</option><option value="_blank">_blank</option><option value="_new">_new</option><option value="_top">_top</option><option value="_parent">_parent</option><option value="myIfm">myIfm</option></select> enctype:<select><option value="">默认</option><option value="application/x-www-form-urlencoded">application/x-www-form-urlencoded</option><option value="multipart/form-data">multipart/form-data</option></select></div><div class="addBar"><button class="j-add">添加</button>插入在第<select></select>行之后</div><div class="columns"></div></div><div class="handlerBox"><button class="ui-okBtn">确定</button> <button class="ui-cancel closeMe">取消</button></div></div>',
            model: {action:'',fields:[]},
            template: '{{#each this}}<div><label>字段名称:</label>{{#equal type "select" "=="}}<select name="{{name}}"></select>{{else}}{{#equal type "textarea" "=="}}<textarea name="{{name}}"></textarea>{{else}}<input type="{{type}}" name="{{name}}" value="{{value}}" placeholder="{{placeholder}}">{{/equal}}{{/equal}}</div>{{/each}}'
            //template: '{{#each this}}<div><label>字段名称:</label>{{equal type "text" "=="}}<input type="{{type}}" name="{{name}}" value="{{value}}" placeholder="{{placeholder}}">{{/equal}}</div>{{/each}}'
        },
        events: {
            'click .j-add': 'Add'
        },
        popup: function(){
            $.tsh.popupBox({
                hand: this.get('trigger'),
                box: this.element,
                width: 520,
                height:320,
                callback: function( box ){
                    box.find('.titleTag').text( '表单添加' );
                },
                okfn: function( hand, box ){
                    
                }
            })
        },
        dataToTpl: function( tpl, data ){
            return Handlebars.compile( tpl )( data );
        },
        gridRender: function(){
            
            this.element.find('.dialogContent .columns').html( this.dataToTpl( this.get('template'), this.get('model.fields') ) );
            alert(456)
        },
        Add: function(){
            var list = this.get('model').fields;
            list.push( {name:'gege',placeholder:'fds',value:'tsh',type:'text'} );
            this.set('model', this.get('model'));
            // override
        },
        setup: function(){
            
            this.render();
            this.popup();
            this.on('change:model.fields', this.gridRender);
            
            this.get('model').fields = [{name:'gege',placeholder:'fds',value:'tsh',type:'text'}];
            this.set('model', this.get('model'))
            console.log( this.get('model') )
        }
    });
    
    Handlebars.registerHelper('equal', function( v1,v2,type,options ){
        if( typeof options=='undefined' ){
            options = type;
            type = '===';
        }
        var result;
        switch( type ){
            case '===': result = v1===v2 ? options.fn(this) : options.inverse(this); break;
            case '==': result = v1==v2 ? options.fn(this) : options.inverse(this); break;
            case '>': result = v1>v2 ? options.fn(this) : options.inverse(this); break;
            case '<': result = v1<v2 ? options.fn(this) : options.inverse(this); break;
            case '!=': result = v1!=v2 ? options.fn(this) : options.inverse(this); break;
        }
        
        return result;
        
    });
    
    module.exports = Form;
 })