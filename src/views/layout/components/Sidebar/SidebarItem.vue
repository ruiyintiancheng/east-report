<template>
  <div class="menu-wrapper">
    <template v-for="item in routes">
      <template v-if="!item.meta.hidden">
        <router-link v-if="!item.children || item.children.length === 0"
                     :to="{path:item.path, query:getParams(item)}"
                     :key="item.path">
          <el-menu-item class="item"
                        :index="item.path"
                        :class="{'submenu-title-noDropdown':!isNest}">
            <svg-icon v-if="item.meta&&item.meta.icon"
                      :icon-class="item.meta.icon"></svg-icon>
            <span v-if="item.meta&&item.meta.title"
                  slot="title">{{item.meta.title}}</span>
          </el-menu-item>
        </router-link>

        <el-submenu v-else
                    :index="item.path"
                    :key="item.path">
          <template slot="title">
            <svg-icon v-if="item.meta&&item.meta.icon"
                      :icon-class="item.meta.icon"></svg-icon>
            <span v-if="item.meta&&item.meta.title"
                  slot="title">{{item.meta.title}}</span>
          </template>

          <template v-for="child in item.children">
            <template v-if="!child.hidden">
              <sidebar-item :is-nest="true"
                            class="nest-menu"
                            :notFirst="true"
                            v-if="child.children&&child.children.length>0"
                            :routes="[child]"
                            :key="child.path"></sidebar-item>

              <el-tooltip effect="dark"
                          :key="child.path"
                          :visible-arrow="true"
                          :disabled="!(child.meta&&child.meta.title&&titleLength(child.meta.title))"
                          :content="child.meta.title"
                          popper-class="left-menu-tooltip"
                          placement="right">
                <el-menu-item :index="child.path"
                              @click="goPath(child.path,child)">
                  <svg-icon v-if="child.meta&&child.meta.icon"
                            :icon-class="child.meta.icon"></svg-icon>
                  <span v-if="child.meta&&child.meta.title">{{child.meta.title}}</span>
                </el-menu-item>
              </el-tooltip>
            </template>
          </template>
        </el-submenu>
      </template>
    </template>
  </div>
</template>

<script>

export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    hasOneShowingChildren(children) {
      const showingChildren = children.filter(item => {
        return !item.hidden
      })
      if (showingChildren.length === 1) {
        return true
      }
      return false
    },
    titleLength(title) {
      if (title.length <= 10) {
        return false
      }
      return true
    },
    getParams(item) {
      const params = {
      }
      // if (item && item.query) {
      //   console.log(item.query)
      //   try {
      //     params = JSON.parse(item.query)
      //   } catch (error) {
      //     console.log(error)
      //   }
      // }
      // console.log(params)
      return params
    },
    goPath(path, item) {
      const current = path.split('/')[path.split('/').length - 1]
      const routers = this.$store.state.permission.addRouters
      let count = 0
      for (const iterator of routers) {
        let temp = iterator.children[0].path
        temp = temp.split('/')[temp.split('/').length - 1]
        if (current === temp) {
          if (count >= 1) {
            this.$router.push({ path: '/' + iterator.children[0].path, query: this.getParams(item) })
            return
          } else {
            count++
          }
        }
      }
      this.$router.push({ path: path, query: this.getParams(item) })
    }
  }
}
</script>
<style lang="scss">
@import "../../../../styles/variables.scss";
.left-menu-tooltip.el-tooltip__popper.is-dark {
  background-color: $menuBg;
}
</style>



