<script setup lang="ts">
import { onUnmounted } from 'vue'

export interface Props {
  count?: number
  duration?: number // ms
  speed?: number
  colors?: string[]
  variant?: string
  label?: string
  icon?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  count: 220,
  duration: 3500,
  speed: 1,
  colors: () => [
    '#206bc4', '#4299e1', '#bfe3f0',
    '#2fb344', '#d63939', '#f76707',
    '#f59f00', '#ae3ec9', '#d6336c'
  ],
  variant: 'primary',
  label: 'Celebrate',
  icon: true
})

const emit = defineEmits<{
  (e: 'burst'): void
  (e: 'complete'): void
}>()

let canvas: HTMLCanvasElement | null = null
let animationId: number | null = null

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  rotation: number
  rotationSpeed: number
  opacity: number
}

const fire = () => {
  emit('burst')

  // Check if Tabler global Confetti is available
  const tabler = (window as any).tabler
  if (tabler?.Confetti) {
    try {
      const inst = tabler.Confetti.getOrCreateInstance(document.body, {
        count: props.count,
        duration: props.duration,
        speed: props.speed,
        colors: props.colors
      })
      if (inst?.fire) {
        inst.fire()
        return
      }
    } catch (_) {
      // Fall through to internal canvas fallback
    }
  }

  // Internal lightweight canvas confetti fallback
  if (!canvas) {
    canvas = document.createElement('canvas')
    canvas.style.position = 'fixed'
    canvas.style.top = '0'
    canvas.style.left = '0'
    canvas.style.width = '100vw'
    canvas.style.height = '100vh'
    canvas.style.pointerEvents = 'none'
    canvas.style.zIndex = '99999'
    document.body.appendChild(canvas)
  }

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const particles: Particle[] = []
  for (let i = 0; i < props.count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * 50,
      vx: (Math.random() - 0.5) * 4 * props.speed,
      vy: (Math.random() * 4 + 3) * props.speed,
      size: Math.random() * 8 + 4,
      color: props.colors[Math.floor(Math.random() * props.colors.length)] || '#206bc4',
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
      opacity: 1
    })
  }

  const startTime = Date.now()

  const render = () => {
    if (!canvas || !ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const elapsed = Date.now() - startTime
    let alive = false

    for (const p of particles) {
      p.x += p.vx
      p.y += p.vy
      p.rotation += p.rotationSpeed

      // Fade out near bottom or after duration
      if (elapsed > props.duration) {
        p.opacity -= 0.02
      }

      if (p.opacity > 0 && p.y < canvas.height + 20) {
        alive = true
        ctx.save()
        ctx.globalAlpha = Math.max(0, p.opacity)
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rotation * Math.PI) / 180)
        ctx.fillStyle = p.color
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6)
        ctx.restore()
      }
    }

    if (alive && elapsed < props.duration + 2000) {
      animationId = requestAnimationFrame(render)
    } else {
      if (canvas && canvas.parentNode) {
        canvas.parentNode.removeChild(canvas)
        canvas = null
      }
      emit('complete')
    }
  }

  if (animationId) cancelAnimationFrame(animationId)
  animationId = requestAnimationFrame(render)
}

defineExpose({ fire })

onUnmounted(() => {
  if (animationId) cancelAnimationFrame(animationId)
  if (canvas && canvas.parentNode) {
    canvas.parentNode.removeChild(canvas)
    canvas = null
  }
})
</script>

<template>
  <slot :fire="fire">
    <button
      type="button"
      :class="['btn', variant ? `btn-${variant}` : '']"
      data-bs-toggle="confetti"
      :data-bs-count="count"
      :data-bs-duration="duration"
      :data-bs-speed="speed"
      @click="fire"
    >
      <svg
        v-if="icon"
        xmlns="http://www.w3.org/2000/svg"
        class="icon me-1"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M4 5h2" />
        <path d="M5 4v2" />
        <path d="M11.5 4l-.5 2" />
        <path d="M18 5h2" />
        <path d="M19 4v2" />
        <path d="M15 9l-1 1" />
        <path d="M18 13l2 -.5" />
        <path d="M18 19h2" />
        <path d="M19 18v2" />
        <path d="M14 16.518l-6.518 -6.518l-4.482 7l7 4.482z" />
        <path d="M8 15l2 -2" />
      </svg>
      {{ label }}
    </button>
  </slot>
</template>
