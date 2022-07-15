<script lang="ts" setup>
import { ref } from "vue";
import { Expand, Fold, DocumentCopy } from "@element-plus/icons-vue";
// import Md from "../views/pro-filed/pro-select/ProSelectBasic.md";

defineProps<{
  title: string;
  description?: string;
}>();
const codeExpand = ref(false);
const handleExpandCode = () => {
  codeExpand.value = !codeExpand.value;
};
</script>

<template>
  <div class="demo-container">
    <h3 class="demo-title">{{ title }}</h3>
    <div class="demo-desc" v-if="description">{{ description }}</div>
    <div class="demo-content">
      <div class="demo-display"><slot></slot></div>
      <div class="demo-code">
        <div class="demo-code-tool">
          <el-tooltip content="复制代码" placement="bottom">
            <el-icon><DocumentCopy /></el-icon>
          </el-tooltip>
          <el-tooltip content="查看源代码" placement="bottom">
            <el-icon @click="handleExpandCode">
              <Expand v-show="!codeExpand" />
              <Fold v-show="codeExpand" />
            </el-icon>
          </el-tooltip>
        </div>
        <el-collapse-transition>
          <el-scrollbar
            :max-height="400"
            class="demo-code-content"
            v-show="codeExpand"
          >
            <Md />
          </el-scrollbar>
        </el-collapse-transition>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.demo-container {
  background-color: #fff;
  margin-bottom: 24px;
  font-size: 14px;

  .demo-title {
    margin-top: 0;
    margin-bottom: 10px;
    font-size: 24px;
  }

  .demo-desc {
    margin-bottom: 10px;
    line-height: 20px;
    color: #666;
  }

  .demo-content {
    border: 1px solid #eee;
    border-radius: 4px;

    .demo-display {
      padding: 20px;
      border-bottom: 1px solid #eee;
    }

    .demo-code {
      .demo-code-tool {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding: 12px;

        .el-icon {
          margin-left: 12px;
          font-size: 18px;
          cursor: pointer;

          &:hover {
            color: var(--el-color-primary);
          }
        }
      }

      .demo-code-content {
        padding: 0 20px;
        background-color: #f5f7f5;
      }
    }
  }
}
</style>
