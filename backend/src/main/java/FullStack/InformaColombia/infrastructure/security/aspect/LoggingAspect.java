package FullStack.InformaColombia.infrastructure.security.aspect;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.springframework.stereotype.Component;
import lombok.extern.slf4j.Slf4j;


@Aspect
@Component
public class LoggingAspect {
    private static final Logger logger = LoggerFactory.getLogger(LoggingAspect.class);

    private enum OperationState {
        STARTED("🚀", "Iniciando", "\u001B[34m"),      // Azul
        IN_PROGRESS("⚙️", "En proceso", "\u001B[36m"), // Cyan
        COMPLETED("✅", "Completado", "\u001B[32m"),    // Verde
        WARNING("⚠️", "Advertencia", "\u001B[33m"),    // Amarillo
        ERROR("❌", "Error", "\u001B[31m"),            // Rojo
        TERMINATED("🛑", "Terminado", "\u001B[35m");   // Magenta

        final String emoji;
        final String description;
        final String color;
        private static final String RESET = "\u001B[0m";

        OperationState(String emoji, String description, String color) {
            this.emoji = emoji;
            this.description = description;
            this.color = color;
        }
    }

    @Pointcut("within(@org.springframework.web.bind.annotation.RestController *) || " +
            "within(@org.springframework.stereotype.Service *) || " +
            "within(@org.springframework.stereotype.Repository *)")
    public void springBeanPointcut() {}

    @Around("springBeanPointcut()")
    public Object logAround(ProceedingJoinPoint joinPoint) throws Throwable {
        String className = joinPoint.getSignature().getDeclaringTypeName();
        String methodName = joinPoint.getSignature().getName();
        Object[] args = joinPoint.getArgs();

        MDC.put("className", className);
        MDC.put("methodName", methodName);

        try {
            logState(OperationState.STARTED, className, methodName, args);

            logState(OperationState.IN_PROGRESS, className, methodName, args);
            Object result = joinPoint.proceed();

            logState(OperationState.COMPLETED, className, methodName, result);
            return result;

        } catch (Exception e) {
            if (e instanceof RuntimeException) {
                logState(OperationState.WARNING, className, methodName, e.getMessage());
            } else {
                logState(OperationState.ERROR, className, methodName, e.getMessage());
            }
            throw e;
        } finally {
            logState(OperationState.TERMINATED, className, methodName, null);
            MDC.clear();
        }
    }

    private void logState(OperationState state, String className, String methodName, Object details) {
        String message = String.format("%s %s: %s.%s",
                state.emoji,
                state.description,
                className,
                methodName
        );

        switch (state) {
            case ERROR -> logger.error(message + " - Details: {}", details);
            case WARNING -> logger.warn(message + " - Details: {}", details);
            default -> logger.info(message + (details != null ? " - Details: {}" : ""), details);
        }
    }
}