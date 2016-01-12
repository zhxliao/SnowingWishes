# plugin_wish.py
# -*- coding: utf-8 -*-
import random

def wishes():
    allw=db(db.plugin_wish_wishes.id>0).select(orderby=~db.plugin_wish_wishes.apply_time, limitby=(0,30))
    allwishes=''
    for wish in allw:
        allwishes+=str(wish.name)+'@-@'+str(wish.des)+'@-@'+str(wish.apply_time)+'$-$'
    allwishes=allwishes[:-3]
    
    #pic num
    pic_num=random.randint(1,26)
    
    #form to submit a wish
    return dict(allwishes=allwishes, pic_num=pic_num)

def make_wish():
    fields=['name','des']
    form=SQLFORM(db.plugin_wish_wishes,fields=fields).process()
    return dict(form=form)
