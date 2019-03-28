<template>
  <div class="">
    <!-- 遍历路由表，生成左侧菜单 -->
    <template v-for="(item,index) in meuns" v-if="!item.hidden">
      <!-- 一级菜单的情况 -->
      <template v-if="item.children&&item.children.length===1">
        <router-link :to="item.path+'/'+item.children[0].path">
          <!--           index跟浏览器地址对应，这样菜单才能显示选中状态  -->
          <el-menu-item :index="item.path+'/'+item.children[0].path">
            <template slot="title">
              <!-- 设置icon -->
              <i v-if="item.children[0].meta.icon" :class="item.children[0].meta.icon"></i>
              <!-- 菜单名称 -->
              {{item.children[0].meta.title}}
            </template>
          </el-menu-item>
        </router-link>
      </template>
      <!-- 一级菜单的情况 end-->
      <!-- 多级菜单 -->
      <template v-else>
        <el-submenu :index="item.path">
          <template slot="title">
            <i :class="item.meta.icon"></i>
            {{item.meta.title}}
          </template>
          <!-- 遍历子菜单 -->
          <template v-for="(itemChild,indexChild) in item.children"  v-if="!itemChild.hidden">
            <!-- 当发现存在3级或大于3级菜单时,重新遍历当前组件 -->
            <template v-if="itemChild.children&&itemChild.children.length>0">
              <side-meuns :routes="[itemChild]" class="nest-menu"></side-meuns>
            </template>
            <!-- 2级菜单时-->
            <template v-else>
              <router-link :to="item.path+'/'+itemChild.path">
                <el-menu-item :index="item.path+'/'+itemChild.path">
                  <i v-if="itemChild.meta.icon" :class="itemChild.meta.icon"></i>
                  {{itemChild.meta.title}}</el-menu-item>
              </router-link>
            </template>
          </template>
          <!-- 遍历子菜单 end-->
        </el-submenu>
      </template>
      <!-- 多级菜单 end-->
    </template>
  </div>
</template>
<script>
import '@/styles/index.css'
export default {
  name: 'sideMeuns',
  props: {
    routes: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      meuns: ''
    }
  },

  mounted() {
    this.meuns = this.routes
  }
}

</script>