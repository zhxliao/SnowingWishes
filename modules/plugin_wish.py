#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
web2py plugin for wish
"""

import os
from gluon import *
from gluon.storage import Storage
from gluon.sqlhtml import FormWidget
from datetime import *

class Wish(object):
    def __init__(self, db):
        self.db=db
        self.settings=Storage()
        current.plugin_wish=self

    def define_tables(self, migrate=True, fake_migrate=False):
        self.settings.table_wishes = self.db.define_table('plugin_wish_wishes',
            Field('name','string',label='名字'),
            Field('des','string',label='祝福'),
            Field('apply_time',type='date', writable=False, default=(datetime.now()+timedelta(hours=+8)).date().today()),
            migrate=migrate,
            fake_migrate=fake_migrate
            )
        self.settings.table_wishes.name.requires=IS_NOT_EMPTY()
        self.settings.table_wishes.des.requires=IS_NOT_EMPTY()
        self.settings.table_wishes.name.requires=IS_LENGTH(maxsize=20, minsize=1)
