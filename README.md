# 消逝卡（通用卡片）
## 配置资源文件
~~~ 
- url: /hacsfiles/xiaoshi-card/xiaoshi-card.js
  type: module
~~~

## 功能1：HA信息卡(手机平板端通用)
**引用示例**
~~~
type: custom:xiaoshi-update-card
width: 100%
skip_updates: false    #是否包含已跳过的更新
theme: on
exclude_devices:
  - *设备*
exclude_entities:
  - *shiti*
~~~

## 功能2：电话信息余额卡(手机平板端通用)
**引用示例**
~~~
type: custom:xiaoshi-balance-card
name: 电话余额信息
width: 100%
theme: on
entities:
  - entity_id: sensor.999
    attribute: null
    overrides:
      icon: ""
      name: ""
      unit_of_measurement: ""
      warning: ""
  - entity_id: input_boolean.777
    attribute: friendly_name
    overrides:
      name: ""
      icon: ""
      unit_of_measurement: ""
      warning: "99"
~~~

## 功能3：待办事项卡(手机平板端通用)
**引用示例**
~~~
type: custom:xiaoshi-todo-card
width: 100%
theme: on
entities:
  - todo.kuai_di
  - todo.ji_shi_ben
~~~

## 功能4：耗材信息卡片(手机平板端通用)
**引用示例**
~~~
type: custom:xiaoshi-consumables-card
width: 100%
global_warning: <8
columns: "2"
entities:
  - entity_id: input_text.aaa
    overrides:
      name: 奥斯卡德拉萨达实打实实打实
      unit_of_measurement: "%"
      warning: <10
      conversion: "*2"
      icon: ""
  - entity_id: input_text.aaa1
  - entity_id: input_text.aaa2
  - entity_id: input_text.aaa3
  - entity_id: input_text.aaa4
  - entity_id: input_text.aaa5
  - entity_id: input_text.aaa6
  - entity_id: input_text.aaa7
~~~


