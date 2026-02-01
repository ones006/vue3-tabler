<script setup lang="ts">
interface Props {
  fluid?: boolean,
  appName?: string
}
withDefaults(defineProps<Props>(), {
  fluid: false,
  appName: 'Tabler'
})
</script>

<template>
  <footer class="footer footer-transparent d-print-none">
    <div :class="fluid ? 'container-fluid' : 'container-xl'">
      <div class="row text-center align-items-center flex-row-reverse">
        <div class="col-lg-auto ms-lg-auto">
          <ul class="list-inline list-inline-dots mb-0">
            <slot name="links" />
          </ul>
        </div>
        <div class="col-12 col-lg-auto mt-3 mt-lg-0">
          <ul class="list-inline list-inline-dots mb-0">
            <li class="list-inline-item">
              <slot name="copyright">
                Copyright &copy; {{ new Date().getFullYear() }}
                <a href="." class="link-secondary">{{ appName }}</a>.
                All rights reserved.
              </slot>
            </li>
            <slot name="extra" />
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
export default {
  name: 'TFooter'
}
</script>
