<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { Expand, Fold, DocumentCopy, CaretTop } from "@element-plus/icons-vue";
import ClipboardJS from "clipboard";
import { ElMessage } from "element-plus";

const props = defineProps<{
  title: string;
  description?: string;
  code: string;
}>();

const codeExpand = ref(false);
const realCode = computed(() => decodeURIComponent(props.code));
/**
 * 复制源代码
 */
const id = Math.floor((Math.random() + 1) * 1000000);
onMounted(() => {
  const clipboard = new ClipboardJS(`#copy-icon-${id}`, {
    text: () => realCode.value,
  });
  clipboard.on("success", (e) => {
    e.clearSelection();
    ElMessage({ message: "复制成功", type: "success" });
  });
});
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
            <el-icon :id="`copy-icon-${id}`">
              <DocumentCopy />
            </el-icon>
          </el-tooltip>
          <el-tooltip content="查看源代码" placement="bottom">
            <el-icon @click="codeExpand = !codeExpand">
              <Expand v-show="!codeExpand" />
              <Fold v-show="codeExpand" />
            </el-icon>
          </el-tooltip>
        </div>
        <el-collapse-transition v-if="realCode">
          <el-scrollbar :max-height="800" v-show="codeExpand">
            <highlightjs :code="realCode" />
          </el-scrollbar>
        </el-collapse-transition>
        <div
          class="demo-code-fold"
          @click="codeExpand = false"
          v-if="realCode && codeExpand"
        >
          <el-icon><CaretTop /></el-icon>
          <span>隐藏源代码</span>
        </div>
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
      .demo-code-fold {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 44px;
        border-top: 1px solid #eee;
        color: #909399;
        cursor: pointer;
        .el-icon {
          margin-right: 6px;
          font-size: 20px;
        }
        &:hover {
          color: var(--el-color-primary);
        }
      }
    }
  }
}
</style>
