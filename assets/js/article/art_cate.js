//1,样式写好后,获取文字分类列表的数据,用模板引擎渲染
//2,点击添加按钮,添加数据,用layer.open实现弹出层效果
//3,点击编辑按钮,弹出一个弹出层
//4,根据编辑的这一个数据的ID,获取到它的信息,然后渲染后弹出层上
//5,通过代理的形式为修改分类的表单绑定submit事件,把编辑后的数据ajax发出去

$(function () {
    var layer = layui.layer;
    var form = layui.form;
    var indexAdd = null;    //特别注意这个indexAdd必须要是个全局遍历才可以给layer.close用
    var indexEdit = null;

    initArtCateList();
    $('#btnAddCate').on('click', function () {
        indexAdd = layer.open({
            type: 1,          //type如果不指定,就默认是0,下面就是一个默认的确认框
            area: ['500px', '250px'],
            title: '在线调试',
            content: $('#dialog-add').html()
        });
    })


    //点击添加
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        console.log(11);
        $.ajax({
            type: 'post',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('添加失败!')
                }
                initArtCateList();
                layer.msg('添加成功!')
                layer.close(indexAdd)

            }
        })

    })


    //用事件委托的方法,点击编辑按钮,出现弹出层,拿到id,把数据渲染到弹出层上面
    $('tbody').on('click', '.btn-edit', function () {
        indexEdit = layer.open({
            type: 1,          //type如果不指定,就默认是0,下面就是一个默认的确认框
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        });
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'get',
            url: '/my/article/cates/' + id,
            success: function (res) {
                form.val('form-edit', res.data)
            }
        })
    })


    //点击编辑的确认按钮,更新编辑后的数据,还是用事件委托,委托到body身上
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('更新数据失败!')
                }
                layer.msg('更新数据成功!')
                initArtCateList();
                layer.close(indexEdit)

            }
        })
    })



    //用事件委托点击删除按钮,得到id,弹出确认框,用layer的confirm方法,true就发起ajax请求,重新渲染tbody内容
    $('tbody').on('click', '.btn-delete', function () {
        var id = $(this).attr('data-id');
        console.log(id);
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                type: 'get',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除分类失败！')
                    }
                    layer.msg('删除分类成功！')
                    layer.close(index)
                    initArtCateList()
                }
            })
        })
    })










})

function initArtCateList() {
    $.ajax({
        type: 'get',
        url: '/my/article/cates',
        success: function (res) {
            // console.log(res);
            var htmlStr = template('tpl-table', res)
            $('tbody').html(htmlStr)
        }
    })
}

