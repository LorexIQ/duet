<script setup lang="ts">
interface Props {
  size: number;
}

withDefaults(defineProps<Props>(), {
  size: 100
})
</script>

<template>
  <div
      class="loader"
      :style="`height: ${size}px;`"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100">
      <defs>
        <filter id="ldio-qsquh4gem2-filter">
          <feTurbulence baseFrequency="0.034999999999999996" numOctaves="100" seed="0" result="turb">
            <animate attributeName="seed" calcMode="discrete" values="0;1;2;3;4;5;6;7;8;9;10;11;12;13;14;0" keyTimes="0;0.06666666666666667;0.13333333333333333;0.2;0.26666666666666666;0.3333333333333333;0.4;0.4666666666666667;0.5333333333333333;0.6;0.6666666666666666;0.7333333333333333;0.8;0.8666666666666667;0.9333333333333333;1" dur="1s" repeatCount="indefinite"></animate>
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="turb" scale="5"></feDisplacementMap>
        </filter>
      </defs>
      <text x="50" y="50" dy="0.38em" text-anchor="middle" fill="#fcfcfc" font-family="Arial" font-size="20" filter="url(#ldio-qsquh4gem2-filter)">Loading</text>
    </svg>
  </div>
</template>

<style scoped lang="scss">
@import '@colors';

.loader {
  width: max-content;
  background-color: var($background);
  transition: .3s;

  & svg {
    & text {
      fill: var($textColor3)
    }
  }
}
</style>
