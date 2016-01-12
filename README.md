# SnowingWishes
A Web2py plugin and a webpage for wishes with a snowing effect, using HTML5 &amp; JS
The preview site is https://piggy1989.pythonanywhere.com/ylrc/plugin_wish/wishes

You could simply download the 'web2py.plugin.wish.w2p' file.

All you need to do is two steps:

1.Adding the following script in your default.py.

    def wish():
        wishes=db(db.plugin_wish_wishes.apply_time!=None).select(orderby=~db.plugin_wish_wishes.apply_time, limitby=(0,100))
        return dict(wishes=wishes)

2.Adding the following script in your db.py.

    from plugin_wish import Wish
    wish = Wish(db)
    wish.define_tables()
