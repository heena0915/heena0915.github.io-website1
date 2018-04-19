tinymce.PluginManager.add('widget', function(editor) {
  var VK = tinymce.util.VK;

  var mapper = editor.getParam("widget_mapper", {});

  function getMappedValue(id, existingNode) {
    if(typeof mapper === 'function')
      return mapper(id, existingNode);

    return existingNode;
  }

  editor.addCommand('pfWidgetUpdate', function(ui, v) {
    updateWidgets();
  });

  function updateWidgets(){
    var nodeList = [];

    tinymce.walk(editor.getBody(), function(n) {
      if (n.nodeType == 1) {
        if(n.hasAttribute("data-widget-id")){
          nodeList.push(n);
        }
      }
    }, 'childNodes');

    for (var i = 0; i < nodeList.length; i++) {
      updateWidget(nodeList[i]);
    }
  }

  function updateWidget(node){
    var id = node.getAttribute("data-widget-id");
    
    if(typeof mapper === 'function'){
      mapper(id, node);
    }
  }

});
