<template>
    <header class="my-16">
        <router-link v-if="! noHome" tag="button" to="/" class="group flex items-center text-gray-600 mb-2 focus:outline-none">
            <Icon icon="arrow-thin-left-circle" class="w-6 h-6 mr-1" primary="text-white" secondary="group-hover:text-gray-900"></Icon>
            <div class="uppercase tracking-wider font-semibold text-sm group-hover:text-gray-900">Home</div>
        </router-link>
        <div class="flex flex-col md:flex-row items-center justify-between">
          <div>
            <img v-if="noHome" class="h-32 w-32 rounded-full mr-8" src="https://lncal.com/img/users/orDdFUgWgXW23GOdGK1fSRHIFF14gAyox4P1f49x.png?w=300&h=300&fit=crop" alt="Giacomo Zucco" />
            <div class="">
              <div class="text-gray-800 font-sans text-4xl md:text-5xl font-semibold leading-tight" v-text="effectiveTitle"></div>
              <div class="text-gray-800 font-sans text-xl md:text-2xl font-medium" v-if="effectiveSubtitle" v-text="effectiveSubtitle"></div>
            </div>
          </div>
          <a v-if="noHome" href="https://lncal.com/giacomozucco" class="mt-4 md:mt-0 border-0 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-white text-sm leading-4 font-bold whitespace-nowrap">
            Book my time ⏰
          </a>
        </div>
    </header>
</template>

<script>
export default {
    props: {
        title: String,
        subtitle: String,
        noHome: Boolean,
    },
    computed: {
        effectiveTitle () {
            return this.title || this.$page.frontmatter.header_title || this.$page.title
        },
        effectiveSubtitle () {
            return this.subtitle || this.$page.frontmatter.subtitle
        },
    }
}
</script>
