<script lang="ts" setup>
import { ref } from "vue";
import routes from "@/router/routes";
import type { MenuItemRegistered } from "element-plus";
import { useRouter } from "vue-router";

const router = useRouter();
const menus = ref(routes[0].children);
const handleMenuClick = ({ index }: MenuItemRegistered) => {
  router.push(index);
};
</script>

<template>
  <el-container>
    <el-header>Pro Components</el-header>
    <el-container class="middle-layout-container">
      <el-aside width="240px">
        <el-menu default-active="2" class="el-menu-vertical-demo">
          <template v-for="menu in menus">
            <h3 class="aside-title">{{ menu.name }}</h3>
            <template v-for="route in menu.children">
              <el-menu-item :index="route.path" @click="handleMenuClick">
                {{ route.name }}
              </el-menu-item>
            </template>
          </template>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <el-scrollbar>
            <router-view />
          </el-scrollbar>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
      <el-aside width="240px"> 右侧导航栏 </el-aside>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.middle-layout-container {
  height: calc(100vh - 60px);
  .aside-title {
    padding-left: 12px;
  }
}
</style>
